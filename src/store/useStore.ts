import { create } from 'zustand';
import { getDb } from '../db/client';
import { updateWidgetData } from '../utils/widget';
import { getWeekKey, getSeasonKey } from '../utils/periods';

interface UserStats {
    totalXp: number;
    currentStreak: number;
    maxStreak: number;
    dailyStreak: number;
    weeklyXp: number;
    seasonXp: number;
    streakShields: number;
    ghostBestScore: number;
}

interface AppState {
    stats: UserStats;
    isLoading: boolean;
    isPro: boolean;
    friendCode: string | null;
    username: string | null;
    qaOverlay: boolean;
    loadStats: () => Promise<void>;
    addXp: (xp: number, correct: boolean) => Promise<void>;
    addXpWithOptions: (xp: number, correct: boolean, options?: { preserveStreak?: boolean }) => Promise<void>;
    addDailyResult: (dateKey: string, correct: boolean, xpEarned: number) => Promise<void>;
    consumeShield: () => Promise<void>;
    setGhostBestScore: (score: number) => Promise<void>;
    setIsPro: (isPro: boolean) => void;
    setQaOverlay: (visible: boolean) => void;
    setUsername: (name: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
    stats: {
        totalXp: 0,
        currentStreak: 0,
        maxStreak: 0,
        dailyStreak: 0,
        weeklyXp: 0,
        seasonXp: 0,
        streakShields: 0,
        ghostBestScore: 0,
    },
    isLoading: true,
    isPro: false,
    friendCode: null,
    username: null,
    qaOverlay: false,

    setIsPro: (isPro) => {
        set({ isPro });
        getDb().then(db => db.runAsync('UPDATE user_stats SET is_pro = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [isPro ? 1 : 0]));
    },
    setQaOverlay: (visible) => set({ qaOverlay: visible }),
    setUsername: (name) => {
        set({ username: name });
        getDb().then(db => db.runAsync('UPDATE user_stats SET username = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [name]));
    },

    loadStats: async () => {
        const db = await getDb();
        const stats: any = await db.getFirstAsync('SELECT * FROM user_stats WHERE id = 1');
        if (stats) {
            let friendCode = stats.friend_code ?? null;
            if (!friendCode) {
                const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
                friendCode = `GUEST-${rand}`;
                await db.runAsync('UPDATE user_stats SET friend_code = ? WHERE id = 1', [friendCode]);
            }
            set({
                stats: {
                    totalXp: stats.total_xp,
                    currentStreak: stats.current_streak,
                    maxStreak: stats.max_streak,
                    dailyStreak: stats.daily_streak ?? 0,
                    weeklyXp: stats.weekly_xp ?? 0,
                    seasonXp: stats.season_xp ?? 0,
                    streakShields: stats.streak_shields ?? 0,
                    ghostBestScore: stats.ghost_best_score ?? 0,
                },
                isLoading: false,
                isPro: (stats as any).is_pro === 1,
                friendCode,
                username: stats.username ?? null,
            });
        }
    },

    addXp: async (xp: number, correct: boolean) => {
        await get().addXpWithOptions(xp, correct);
    },

    addXpWithOptions: async (xp: number, correct: boolean, options?: { preserveStreak?: boolean }) => {
        const { stats } = get();
        const earned = correct ? xp : 0;
        const newXp = stats.totalXp + earned;
        const newStreak = correct ? stats.currentStreak + 1 : (options?.preserveStreak ? stats.currentStreak : 0);
        const newMaxStreak = Math.max(stats.maxStreak, newStreak);
        const shieldEarned = correct && newStreak > 0 && newStreak % 10 === 0;
        const nextShieldCount = Math.min(3, stats.streakShields + (shieldEarned ? 1 : 0));

        // OPTIMISTIC UPDATE: Update UI immediately
        set({
            stats: {
                totalXp: newXp,
                currentStreak: newStreak,
                maxStreak: newMaxStreak,
                dailyStreak: stats.dailyStreak,
                weeklyXp: stats.weeklyXp,
                seasonXp: stats.seasonXp,
                streakShields: nextShieldCount,
                ghostBestScore: stats.ghostBestScore,
            }
        });

        // Background: Handle DB and Milestones
        const db = await getDb();
        const now = new Date();
        const weekKey = getWeekKey(now);
        const seasonKey = getSeasonKey(now);
        const periodStats = await db.getFirstAsync<{
            weekly_xp?: number;
            season_xp?: number;
            week_key?: string;
            season_key?: string;
        }>('SELECT weekly_xp, season_xp, week_key, season_key FROM user_stats WHERE id = 1');

        const weeklyReset = periodStats?.week_key !== weekKey;
        const seasonReset = periodStats?.season_key !== seasonKey;

        const nextWeeklyXp = (weeklyReset ? 0 : (periodStats?.weekly_xp ?? stats.weeklyXp)) + earned;
        const nextSeasonXp = (seasonReset ? 0 : (periodStats?.season_xp ?? stats.seasonXp)) + earned;

        // Milestone checks - comprehensive achievement system
        const checkMilestones = async (xp: number, streak: number, maxStreak: number, wasCorrect: boolean) => {
            const updateMilestones = async (ids: string[]) => {
                if (ids.length === 0) return;
                const placeholders = ids.map(() => '?').join(', ');
                await db.runAsync(
                    `UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders}) AND completed_at IS NULL`,
                    ids
                );
            };

            // First guess (always check)
            await updateMilestones(['first_guess']);

            if (!wasCorrect) {
                return;
            }

            const milestonesToUpdate: string[] = [];

            // Streak achievements
            const streakThresholds = [3, 5, 10, 25, 50, 100];
            for (const threshold of streakThresholds) {
                if (maxStreak >= threshold) {
                    milestonesToUpdate.push(`streak_${threshold}`);
                }
            }

            // XP achievements
            const xpThresholds = [100, 500, 1000, 5000, 10000];
            for (const threshold of xpThresholds) {
                if (xp >= threshold) {
                    milestonesToUpdate.push(`total_${threshold}_xp`);
                }
            }

            // Session streak (current session)
            const sessionThresholds = [5, 10, 20];
            for (const threshold of sessionThresholds) {
                if (streak >= threshold) {
                    milestonesToUpdate.push(`perfect_session_${threshold}`);
                }
            }

            // Combo: streak + XP
            if (maxStreak >= 10 && xp >= 500) {
                milestonesToUpdate.push('streak_and_xp');
            }

            // Comeback kid: currently at 10+ streak
            if (streak >= 10) {
                milestonesToUpdate.push('comeback_kid');
            }

            await updateMilestones(milestonesToUpdate);

            // Correct guesses achievements (query from DB)
            const correctResult = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM quiz_results WHERE is_correct = 1');
            const correctCount = correctResult?.count || 0;
            const correctThresholds = [10, 50, 100, 500, 1000];
            const correctMilestones: string[] = [];
            for (const threshold of correctThresholds) {
                if (correctCount >= threshold) {
                    correctMilestones.push(`correct_${threshold}`);
                }
            }
            await updateMilestones(correctMilestones);

            // Category-specific achievements (single grouped query)
            const categories = ['Literature', 'Science', 'Philosophy', 'History', 'Fantasy', 'Pop Culture'];
            const categoryIds = ['literature', 'science', 'philosophy', 'history', 'fantasy', 'popculture'];
            const categoryRows = await db.getAllAsync<{ category: string; count: number }>(
                'SELECT category, COUNT(*) as count FROM quiz_results WHERE is_correct = 1 GROUP BY category'
            );
            const categoryMap = new Map(categoryRows.map(row => [row.category, row.count]));
            const categoryMilestones: string[] = [];
            for (let i = 0; i < categories.length; i++) {
                const cat = categories[i];
                const catId = categoryIds[i];
                const catCount = categoryMap.get(cat) || 0;
                if (catCount >= 10) {
                    categoryMilestones.push(`${catId}_10`);
                }
                if (catCount >= 50) {
                    categoryMilestones.push(`${catId}_50`);
                }
            }
            await updateMilestones(categoryMilestones);

            // Grandmaster: check if 20+ achievements unlocked
            const unlockedResult = await db.getFirstAsync<{ count: number }>(
                'SELECT COUNT(*) as count FROM milestones WHERE completed_at IS NOT NULL AND id != "grandmaster"'
            );
            if ((unlockedResult?.count || 0) >= 20) {
                await updateMilestones(['grandmaster']);
            }
        };

        await checkMilestones(newXp, newStreak, newMaxStreak, correct);

        await db.runAsync(
            'UPDATE user_stats SET total_xp = ?, current_streak = ?, max_streak = ?, weekly_xp = ?, season_xp = ?, week_key = ?, season_key = ?, streak_shields = ?, last_played_at = CURRENT_TIMESTAMP WHERE id = 1',
            [newXp, newStreak, newMaxStreak, nextWeeklyXp, nextSeasonXp, weekKey, seasonKey, nextShieldCount]
        );

        if (newStreak !== stats.currentStreak || newXp !== stats.totalXp) {
            updateWidgetData({ currentStreak: newStreak, totalXp: newXp });
        }

        set({
            stats: {
                ...get().stats,
                weeklyXp: nextWeeklyXp,
                seasonXp: nextSeasonXp,
                streakShields: nextShieldCount,
            }
        });

    },

    addDailyResult: async (dateKey: string, correct: boolean, xpEarned: number) => {
        const db = await getDb();
        const { stats } = get();

        const lastDate = stats ? (await db.getFirstAsync<{ last_daily_date?: string; daily_streak?: number }>(
            'SELECT last_daily_date, daily_streak FROM user_stats WHERE id = 1'
        )) : null;

        const prevDate = lastDate?.last_daily_date ?? null;
        const prevStreak = lastDate?.daily_streak ?? stats.dailyStreak ?? 0;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

        let nextStreak = prevStreak;
        if (prevDate === dateKey) {
            nextStreak = prevStreak;
        } else if (prevDate === yKey) {
            nextStreak = prevStreak + 1;
        } else {
            nextStreak = 1;
        }

        await db.runAsync(
            'UPDATE user_stats SET daily_streak = ?, last_daily_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
            [nextStreak, dateKey]
        );

        set({
            stats: {
                ...stats,
                dailyStreak: nextStreak,
            }
        });
    },

    consumeShield: async () => {
        const db = await getDb();
        const current = get().stats.streakShields;
        const next = Math.max(0, current - 1);
        await db.runAsync(
            'UPDATE user_stats SET streak_shields = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
            [next]
        );
        set({
            stats: {
                ...get().stats,
                streakShields: next,
            }
        });
    },

    setGhostBestScore: async (score: number) => {
        const db = await getDb();
        await db.runAsync(
            'UPDATE user_stats SET ghost_best_score = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
            [score]
        );
        set({
            stats: {
                ...get().stats,
                ghostBestScore: score,
            }
        });
    },

}));

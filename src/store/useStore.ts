import { create } from 'zustand';
import { getDb } from '../db/client';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import { updateWidgetData } from '../utils/widget';
import Constants from 'expo-constants';
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
    adFreeUntil: number | null;
    isGuest: boolean;
    user: User | null;
    session: Session | null;
    friendCode: string | null;
    loadStats: () => Promise<void>;
    addXp: (xp: number, correct: boolean) => Promise<void>;
    addXpWithOptions: (xp: number, correct: boolean, options?: { preserveStreak?: boolean }) => Promise<void>;
    addDailyResult: (dateKey: string, correct: boolean, xpEarned: number) => Promise<void>;
    consumeShield: () => Promise<void>;
    setGhostBestScore: (score: number) => Promise<void>;
    setSession: (session: Session | null) => void;
    setGuest: (isGuest: boolean) => void;
    syncStatsToRemote: () => Promise<void>;
    setIsPro: (isPro: boolean) => void;
    setAdFreeUntil: (timestamp: number | null) => void;
    grantAdFreeMinutes: (minutes: number) => void;
    mergeLocalWithRemote: () => Promise<void>;
    enqueueStatSync: () => Promise<void>;
    processSyncQueue: () => Promise<void>;
}

import { Platform, NativeModules } from 'react-native';

const generateFriendCode = (userId: string) => {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
    }
    return `AGT-${hash.toString(36).toUpperCase().padStart(6, '0').slice(0, 6)}`;
};

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
    adFreeUntil: null,
    isGuest: false,
    user: null,
    session: null,
    friendCode: null,

    setIsPro: (isPro) => set({ isPro }),
    setAdFreeUntil: (timestamp) => {
        set({ adFreeUntil: timestamp });
        getDb().then(db => db.runAsync('UPDATE user_stats SET ad_free_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [timestamp]));
    },
    grantAdFreeMinutes: (minutes) => {
        const now = Date.now();
        const current = get().adFreeUntil ?? 0;
        const next = Math.max(current, now) + minutes * 60 * 1000;
        set({ adFreeUntil: next });
        getDb().then(db => db.runAsync('UPDATE user_stats SET ad_free_until = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1', [next]));
    },

    setGuest: (isGuest) => set({ isGuest }),

    setSession: (session) => {
        set({ session, user: session?.user ?? null, isGuest: false }); // Reset guest if session exists
        if (session) {
            get().mergeLocalWithRemote();

            // Initialize RevenueCat
            const hasNativePurchases = !!NativeModules.RNPurchases;
            if (hasNativePurchases) {
                try {
                    const Purchases = require('react-native-purchases').default;
                    const revenuecat = (Constants.expoConfig as any)?.extra?.revenuecat || {};
                    const apiKey = Platform.OS === 'ios' ? revenuecat.ios : revenuecat.android;
                    Purchases.configure({ apiKey });
                    console.log('RevenueCat configured successfully');
                } catch (e) {
                    console.warn('RevenueCat setup failed (expected in Expo Go without dev client):', e);
                }
            } else {
                console.log('Expo Go or missing native module detected. RevenueCat disabled.');
            }
        }
    },

    loadStats: async () => {
        const db = await getDb();
        const stats: any = await db.getFirstAsync('SELECT * FROM user_stats WHERE id = 1');
        if (stats) {
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
                adFreeUntil: stats.ad_free_until ?? null,
                friendCode: stats.friend_code ?? null,
            });
        }
    },

    syncStatsToRemote: async () => {
        const { session, stats, isGuest } = get();
        if (!session?.user || isGuest) return;

        try {
            await get().processSyncQueue();
            const db = await getDb();
            const syncMeta = await db.getFirstAsync<{ last_sync_xp?: number; last_sync_at?: number }>(
                'SELECT last_sync_xp, last_sync_at FROM user_stats WHERE id = 1'
            );
            const lastXp = syncMeta?.last_sync_xp ?? stats.totalXp;
            const lastAt = syncMeta?.last_sync_at ?? Date.now();
            const minutes = Math.max((Date.now() - lastAt) / 60000, 1);
            const xpPerMinute = (stats.totalXp - lastXp) / minutes;
            if (xpPerMinute > 300) {
                console.warn('Sync blocked: suspicious XP rate', xpPerMinute);
                return;
            }

            const weekKey = getWeekKey();
            const seasonKey = getSeasonKey();

            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: session.user.id,
                    total_xp: stats.totalXp,
                    max_streak: stats.maxStreak,
                    weekly_xp: stats.weeklyXp,
                    season_xp: stats.seasonXp,
                    week_key: weekKey,
                    season_key: seasonKey,
                    friend_code: get().friendCode ?? null,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;
            console.log('Stats synced to Supabase (XP:', stats.totalXp, 'Max Streak:', stats.maxStreak, ')');
            await db.runAsync(
                'UPDATE user_stats SET last_sync_xp = ?, last_sync_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
                [stats.totalXp, Date.now()]
            );
        } catch (error) {
            console.error('Error syncing stats:', error);
        }
    },

    addXp: async (xp: number, correct: boolean) => {
        await get().addXpWithOptions(xp, correct);
    },

    addXpWithOptions: async (xp: number, correct: boolean, options?: { preserveStreak?: boolean }) => {
        const { stats, session, isGuest, syncStatsToRemote } = get();
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
        const checkMilestones = async (xp: number, streak: number, maxStreak: number) => {
            // First guess (always check)
            await db.runAsync('UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "first_guess" AND completed_at IS NULL');

            // Streak achievements
            const streakThresholds = [3, 5, 10, 25, 50, 100];
            for (const threshold of streakThresholds) {
                if (maxStreak >= threshold) {
                    await db.runAsync(`UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "streak_${threshold}" AND completed_at IS NULL`);
                }
            }

            // XP achievements
            const xpThresholds = [100, 500, 1000, 5000, 10000];
            for (const threshold of xpThresholds) {
                if (xp >= threshold) {
                    await db.runAsync(`UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "total_${threshold}_xp" AND completed_at IS NULL`);
                }
            }

            // Correct guesses achievements (query from DB)
            const correctResult = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM quiz_results WHERE is_correct = 1');
            const correctCount = correctResult?.count || 0;
            const correctThresholds = [10, 50, 100, 500, 1000];
            for (const threshold of correctThresholds) {
                if (correctCount >= threshold) {
                    await db.runAsync(`UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "correct_${threshold}" AND completed_at IS NULL`);
                }
            }

            // Session streak (current session)
            const sessionThresholds = [5, 10, 20];
            for (const threshold of sessionThresholds) {
                if (streak >= threshold) {
                    await db.runAsync(`UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "perfect_session_${threshold}" AND completed_at IS NULL`);
                }
            }

            // Combo: streak + XP
            if (maxStreak >= 10 && xp >= 500) {
                await db.runAsync('UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "streak_and_xp" AND completed_at IS NULL');
            }

            // Comeback kid: currently at 10+ streak
            if (streak >= 10) {
                await db.runAsync('UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "comeback_kid" AND completed_at IS NULL');
            }

            // Check category-specific achievements
            const categories = ['Literature', 'Science', 'Philosophy', 'History', 'Fantasy', 'Pop Culture'];
            const categoryIds = ['literature', 'science', 'philosophy', 'history', 'fantasy', 'popculture'];
            for (let i = 0; i < categories.length; i++) {
                const cat = categories[i];
                const catId = categoryIds[i];
                const catResult = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM quiz_results WHERE is_correct = 1 AND category = ?', [cat]);
                const catCount = catResult?.count || 0;
                if (catCount >= 10) {
                    await db.runAsync(`UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "${catId}_10" AND completed_at IS NULL`);
                }
                if (catCount >= 50) {
                    await db.runAsync(`UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "${catId}_50" AND completed_at IS NULL`);
                }
            }

            // Grandmaster: check if 20+ achievements unlocked
            const unlockedResult = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM milestones WHERE completed_at IS NOT NULL AND id != "grandmaster"');
            if ((unlockedResult?.count || 0) >= 20) {
                await db.runAsync('UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "grandmaster" AND completed_at IS NULL');
            }
        };

        await checkMilestones(newXp, newStreak, newMaxStreak);

        await db.runAsync(
            'UPDATE user_stats SET total_xp = ?, current_streak = ?, max_streak = ?, weekly_xp = ?, season_xp = ?, week_key = ?, season_key = ?, streak_shields = ?, last_played_at = CURRENT_TIMESTAMP WHERE id = 1',
            [newXp, newStreak, newMaxStreak, nextWeeklyXp, nextSeasonXp, weekKey, seasonKey, nextShieldCount]
        );

        updateWidgetData({ currentStreak: newStreak, totalXp: newXp });

        set({
            stats: {
                ...get().stats,
                weeklyXp: nextWeeklyXp,
                seasonXp: nextSeasonXp,
                streakShields: nextShieldCount,
            }
        });

        await get().enqueueStatSync();

        if (session && !isGuest) {
            await syncStatsToRemote();
        }
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

    enqueueStatSync: async () => {
        const db = await getDb();
        const stats = get().stats;
        const period = await db.getFirstAsync<{ week_key?: string; season_key?: string }>(
            'SELECT week_key, season_key FROM user_stats WHERE id = 1'
        );
        await db.runAsync(
            'INSERT INTO sync_queue (total_xp, max_streak, weekly_xp, season_xp, week_key, season_key) VALUES (?, ?, ?, ?, ?, ?)',
            [stats.totalXp, stats.maxStreak, stats.weeklyXp, stats.seasonXp, period?.week_key ?? null, period?.season_key ?? null]
        );
    },

    processSyncQueue: async () => {
        const { session, isGuest } = get();
        if (!session?.user || isGuest) return;

        const db = await getDb();
        const latest = await db.getFirstAsync<{
            total_xp: number;
            max_streak: number;
            weekly_xp?: number;
            season_xp?: number;
            week_key?: string;
            season_key?: string;
        }>(
            'SELECT total_xp, max_streak, weekly_xp, season_xp, week_key, season_key FROM sync_queue ORDER BY id DESC LIMIT 1'
        );
        if (!latest) return;

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: session.user.id,
                total_xp: latest.total_xp,
                max_streak: latest.max_streak,
                weekly_xp: latest.weekly_xp ?? null,
                season_xp: latest.season_xp ?? null,
                week_key: latest.week_key ?? null,
                season_key: latest.season_key ?? null,
                friend_code: get().friendCode ?? null,
                updated_at: new Date().toISOString(),
            });
        if (!error) {
            await db.runAsync('DELETE FROM sync_queue');
        }
    },

    mergeLocalWithRemote: async () => {
        const { session, isGuest } = get();
        if (!session?.user || isGuest) return;

        const db = await getDb();
        const local = await db.getFirstAsync<{ total_xp: number; max_streak: number }>(
            'SELECT total_xp, max_streak FROM user_stats WHERE id = 1'
        );

        let remoteXp = 0;
        let remoteMax = 0;
        let remoteWeekly = 0;
        let remoteSeason = 0;
        let remoteWeekKey: string | null = null;
        let remoteSeasonKey: string | null = null;
        let remoteFriendCode: string | null = null;
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('total_xp, max_streak, weekly_xp, season_xp, week_key, season_key, friend_code')
                .eq('id', session.user.id)
                .single();

            if (!error && data) {
                remoteXp = data.total_xp || 0;
                remoteMax = data.max_streak || 0;
                remoteWeekly = data.weekly_xp || 0;
                remoteSeason = data.season_xp || 0;
                remoteWeekKey = data.week_key || null;
                remoteSeasonKey = data.season_key || null;
                remoteFriendCode = data.friend_code || null;
            }
        } catch {
            // Ignore remote read failures, use local for now
        }

        const currentWeekKey = getWeekKey();
        const currentSeasonKey = getSeasonKey();

        const localPeriod = await db.getFirstAsync<{
            weekly_xp?: number;
            season_xp?: number;
            week_key?: string;
            season_key?: string;
            friend_code?: string;
        }>('SELECT weekly_xp, season_xp, week_key, season_key, friend_code FROM user_stats WHERE id = 1');

        const mergedXp = (local?.total_xp || 0) + remoteXp;
        const mergedMax = Math.max(local?.max_streak || 0, remoteMax);
        const mergedWeekly = (localPeriod?.week_key === currentWeekKey ? (localPeriod?.weekly_xp || 0) : 0) +
            (remoteWeekKey === currentWeekKey ? remoteWeekly : 0);
        const mergedSeason = (localPeriod?.season_key === currentSeasonKey ? (localPeriod?.season_xp || 0) : 0) +
            (remoteSeasonKey === currentSeasonKey ? remoteSeason : 0);

        let friendCode = localPeriod?.friend_code || remoteFriendCode;
        if (!friendCode) {
            friendCode = generateFriendCode(session.user.id);
            await db.runAsync('UPDATE user_stats SET friend_code = ? WHERE id = 1', [friendCode]);
            set({ friendCode });
        } else {
            set({ friendCode });
        }

        await db.runAsync(
            'UPDATE user_stats SET total_xp = ?, max_streak = ?, weekly_xp = ?, season_xp = ?, week_key = ?, season_key = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
            [mergedXp, mergedMax, mergedWeekly, mergedSeason, currentWeekKey, currentSeasonKey]
        );

        set({
            stats: {
                ...get().stats,
                totalXp: mergedXp,
                maxStreak: mergedMax,
                weeklyXp: mergedWeekly,
                seasonXp: mergedSeason,
            }
        });

        await get().enqueueStatSync();
        await get().processSyncQueue();
    },
}));

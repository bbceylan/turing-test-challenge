import { create } from 'zustand';
import { getDb } from '../db/client';

interface UserStats {
    totalXp: number;
    currentStreak: number;
    maxStreak: number;
}

import { Session, User } from '@supabase/supabase-js';

interface AppState {
    stats: UserStats;
    isLoading: boolean;
    user: User | null;
    session: Session | null;
    loadStats: () => Promise<void>;
    addXp: (xp: number, correct: boolean) => Promise<void>;
    setSession: (session: Session | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
    stats: {
        totalXp: 0,
        currentStreak: 0,
        maxStreak: 0,
    },
    isLoading: true,
    user: null,
    session: null,

    setSession: (session) => {
        set({ session, user: session?.user ?? null });
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
                },
                isLoading: false,
            });
        }
    },

    addXp: async (xp: number, correct: boolean) => {
        const { stats } = get();
        const db = await getDb();

        const newXp = stats.totalXp + (correct ? xp : 0);
        const newStreak = correct ? stats.currentStreak + 1 : 0;
        const newMaxStreak = Math.max(stats.maxStreak, newStreak);

        // Milestone checks
        const checkMilestones = async (xp: number, streak: number) => {
            if (streak === 5) {
                await db.runAsync('UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "streak_5" AND completed_at IS NULL');
            }
            if (xp >= 100) {
                await db.runAsync('UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "total_100_xp" AND completed_at IS NULL');
            }
            await db.runAsync('UPDATE milestones SET completed_at = CURRENT_TIMESTAMP WHERE id = "first_guess" AND completed_at IS NULL');
        };

        await checkMilestones(newXp, newStreak);

        await db.runAsync(
            'UPDATE user_stats SET total_xp = ?, current_streak = ?, max_streak = ?, last_played_at = CURRENT_TIMESTAMP WHERE id = 1',
            [newXp, newStreak, newMaxStreak]
        );

        set({
            stats: {
                totalXp: newXp,
                currentStreak: newStreak,
                maxStreak: newMaxStreak,
            }
        });
    },
}));

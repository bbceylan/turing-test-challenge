import { create } from 'zustand';
import { getDb } from '../db/client';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import { updateWidgetData } from '../utils/widget';
import Constants from 'expo-constants';

interface UserStats {
    totalXp: number;
    currentStreak: number;
    maxStreak: number;
}

interface AppState {
    stats: UserStats;
    isLoading: boolean;
    isPro: boolean;
    isGuest: boolean;
    user: User | null;
    session: Session | null;
    loadStats: () => Promise<void>;
    addXp: (xp: number, correct: boolean) => Promise<void>;
    setSession: (session: Session | null) => void;
    setGuest: (isGuest: boolean) => void;
    syncStatsToRemote: () => Promise<void>;
    setIsPro: (isPro: boolean) => void;
}

import { Platform, NativeModules } from 'react-native';

export const useStore = create<AppState>((set, get) => ({
    stats: {
        totalXp: 0,
        currentStreak: 0,
        maxStreak: 0,
    },
    isLoading: true,
    isPro: false,
    isGuest: false,
    user: null,
    session: null,

    setIsPro: (isPro) => set({ isPro }),

    setGuest: (isGuest) => set({ isGuest }),

    setSession: (session) => {
        set({ session, user: session?.user ?? null, isGuest: false }); // Reset guest if session exists
        if (session) {
            get().syncStatsToRemote();

            // Initialize RevenueCat
            const hasNativePurchases = !!NativeModules.RNPurchases;
            if (hasNativePurchases) {
                try {
                    const Purchases = require('react-native-purchases').default;
                    const apiKey = Platform.OS === 'ios' ? 'goog_EXAMPLE_REVENUECAT_ID' : 'goog_EXAMPLE_REVENUECAT_ID';
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
                },
                isLoading: false,
            });
        }
    },

    syncStatsToRemote: async () => {
        const { session, stats, isGuest } = get();
        if (!session?.user || isGuest) return;

        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: session.user.id,
                    total_xp: stats.totalXp,
                    max_streak: stats.maxStreak,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;
            console.log('Stats synced to Supabase (XP:', stats.totalXp, 'Max Streak:', stats.maxStreak, ')');
        } catch (error) {
            console.error('Error syncing stats:', error);
        }
    },

    addXp: async (xp: number, correct: boolean) => {
        const { stats, session, isGuest, syncStatsToRemote } = get();
        const newXp = stats.totalXp + (correct ? xp : 0);
        const newStreak = correct ? stats.currentStreak + 1 : 0;
        const newMaxStreak = Math.max(stats.maxStreak, newStreak);

        // OPTIMISTIC UPDATE: Update UI immediately
        set({
            stats: {
                totalXp: newXp,
                currentStreak: newStreak,
                maxStreak: newMaxStreak,
            }
        });

        // Background: Handle DB and Milestones
        const db = await getDb();

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
            'UPDATE user_stats SET total_xp = ?, current_streak = ?, max_streak = ?, last_played_at = CURRENT_TIMESTAMP WHERE id = 1',
            [newXp, newStreak, newMaxStreak]
        );

        updateWidgetData({ currentStreak: newStreak, totalXp: newXp });

        if (session && !isGuest) {
            await syncStatsToRemote();
        }
    },
}));

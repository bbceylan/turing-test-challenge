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
                const Purchases = require('react-native-purchases').default;
                const apiKey = Platform.OS === 'ios' ? 'goog_EXAMPLE_REVENUECAT_ID' : 'goog_EXAMPLE_REVENUECAT_ID';
                Purchases.configure({ apiKey });
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
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;
            console.log('Stats synced to Supabase');
        } catch (error) {
            console.error('Error syncing stats:', error);
        }
    },

    addXp: async (xp: number, correct: boolean) => {
        const { stats, syncStatsToRemote, session, isGuest } = get();
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

        updateWidgetData({ currentStreak: newStreak, totalXp: newXp });

        if (session && !isGuest) {
            await syncStatsToRemote();
        }
    },
}));

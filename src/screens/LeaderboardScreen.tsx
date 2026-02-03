import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../hooks/useTheme';
import { supabase } from '../utils/supabase';
import { useStore } from '../store/useStore';
import { Globe, Calendar, Lock, Flame, Users, Crown } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Skeleton } from '../components/Skeleton';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import { getDb } from '../db/client';
import { getWeekKey, getSeasonKey } from '../utils/periods';

interface Player {
    id: string;
    username: string;
    total_xp: number;
    max_streak?: number;
    weekly_xp?: number;
    season_xp?: number;
}

type Tab = 'GLOBAL' | 'WEEKLY' | 'SEASON' | 'STREAKS' | 'FRIENDS';

// Rank badge colors for top 3
const getRankStyle = (index: number) => {
    if (index === 0) return { color: '#FFD700', ...NEON_SHADOWS.pink }; // Gold
    if (index === 1) return { color: '#C0C0C0' }; // Silver
    if (index === 2) return { color: '#CD7F32' }; // Bronze
    return {};
};

// Extracted & Memoized Item Component for Performance
const getTier = (index: number, total: number) => {
    const rank = index + 1;
    const pct = rank / Math.max(total, 1);
    if (pct <= 0.1) return { label: 'Gold', color: '#FFD700' };
    if (pct <= 0.3) return { label: 'Silver', color: '#C0C0C0' };
    if (pct <= 0.6) return { label: 'Bronze', color: '#CD7F32' };
    return null;
};

type RowMode = 'TOTAL' | 'WEEKLY' | 'SEASON' | 'STREAK';

const LeaderboardItem = React.memo(({ item, index, colors, mode, total }: { item: Player; index: number, colors: any, mode: RowMode, total: number }) => {
    const tier = getTier(index, total);
    const showStreak = mode === 'STREAK';
    const xpLabel = mode === 'WEEKLY' ? `${(item as any).weekly_xp ?? 0} XP` : mode === 'SEASON' ? `${(item as any).season_xp ?? 0} XP` : `${item.total_xp} XP`;
    return (
    <Animated.View
        entering={FadeInDown.delay(index * 50).springify()}
        style={[
            styles.row,
            {
                backgroundColor: colors.background.card,
                borderColor: index < 3 ? COLORS.neonPurple : colors.border.default
            },
            index < 3 && NEON_SHADOWS.subtle
        ]}
    >
        <View style={[styles.rankBadge, index < 3 && { backgroundColor: 'rgba(110, 44, 243, 0.2)' }]}>
            <Text style={[styles.rank, { color: colors.text.accent }, getRankStyle(index)]}>
                #{index + 1}
            </Text>
        </View>
        <View style={styles.playerInfo}>
            <Text style={[styles.name, { color: colors.text.primary }]}>{item.username || 'Anonymous Agent'}</Text>
            {showStreak && item.max_streak !== undefined && (
                <Text style={[styles.secondaryInfo, { color: colors.text.secondary }]}>
                    {item.total_xp} XP
                </Text>
            )}
            {!showStreak && item.max_streak !== undefined && item.max_streak > 0 && (
                <Text style={[styles.secondaryInfo, { color: colors.text.secondary }]}>
                    Best: {item.max_streak}
                </Text>
            )}
        </View>
        <Text style={[styles.xp, { color: showStreak ? COLORS.sunsetOrange : colors.text.highlight }]}>
            {showStreak ? `${item.max_streak || 0}` : xpLabel}
        </Text>
        {showStreak && <Flame size={16} color={COLORS.sunsetOrange} style={{ marginLeft: 4 }} />}
        {tier && (
            <View style={[styles.tierBadge, { borderColor: tier.color }]}>
                <Text style={[styles.tierText, { color: tier.color }]}>{tier.label}</Text>
            </View>
        )}
    </Animated.View>
    );
});

export const LeaderboardScreen = () => {
    const { isGuest } = useStore();
    const { colors } = useTheme();
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('GLOBAL');
    const [error, setError] = useState<string | null>(null);
    const [friendCodes, setFriendCodes] = useState<string[]>([]);
    const [friendInput, setFriendInput] = useState('');

    const loadFriends = React.useCallback(async () => {
        const db = await getDb();
        const rows = await db.getAllAsync<{ friend_code: string }>('SELECT friend_code FROM friends ORDER BY added_at DESC');
        setFriendCodes(rows.map(r => r.friend_code));
    }, []);

    const fetchLeaderboard = React.useCallback(async () => {
        if (isGuest) {
            setLoading(false);
            setRefreshing(false);
            return;
        }

        setError(null);
        try {
            let query;

            if (activeTab === 'STREAKS') {
                query = supabase
                    .from('profiles')
                    .select('id, username, total_xp, max_streak')
                    .order('max_streak', { ascending: false })
                    .limit(50);
            } else if (activeTab === 'WEEKLY') {
                query = supabase
                    .from('profiles')
                    .select('id, username, total_xp, max_streak, weekly_xp, week_key')
                    .eq('week_key', getWeekKey())
                    .order('weekly_xp', { ascending: false })
                    .limit(50);
            } else if (activeTab === 'SEASON') {
                query = supabase
                    .from('profiles')
                    .select('id, username, total_xp, max_streak, season_xp, season_key')
                    .eq('season_key', getSeasonKey())
                    .order('season_xp', { ascending: false })
                    .limit(50);
            } else if (activeTab === 'FRIENDS') {
                if (friendCodes.length === 0) {
                    setPlayers([]);
                    setLoading(false);
                    setRefreshing(false);
                    return;
                }
                query = supabase
                    .from('profiles')
                    .select('id, username, total_xp, max_streak')
                    .in('friend_code', friendCodes)
                    .order('total_xp', { ascending: false })
                    .limit(50);
            } else {
                query = supabase
                    .from('profiles')
                    .select('id, username, total_xp, max_streak')
                    .order('total_xp', { ascending: false })
                    .limit(50);
            }

            const { data, error } = await query;

            if (error) throw error;
            setPlayers(data || []);
        } catch (err: any) {
            console.error('Error fetching leaderboard:', err);
            setError('Could not connect to the ritual network.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [activeTab, isGuest, friendCodes]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    useEffect(() => {
        loadFriends();
    }, [loadFriends]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    const renderTabs = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.tabContainer, { backgroundColor: colors.background.secondary }]}
        >
            <TouchableOpacity
                style={[styles.tab, activeTab === 'GLOBAL' && { backgroundColor: colors.border.default }]}
                onPress={() => {
                    Haptics.selectionAsync();
                    setActiveTab('GLOBAL');
                }}
            >
                <Globe size={18} color={activeTab === 'GLOBAL' ? colors.text.primary : colors.text.secondary} />
                <Text style={[styles.tabText, { color: activeTab === 'GLOBAL' ? colors.text.primary : colors.text.secondary }]}>Global</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'WEEKLY' && { backgroundColor: colors.border.default }]}
                onPress={() => {
                    Haptics.selectionAsync();
                    setActiveTab('WEEKLY');
                }}
            >
                <Calendar size={18} color={activeTab === 'WEEKLY' ? colors.text.primary : colors.text.secondary} />
                <Text style={[styles.tabText, { color: activeTab === 'WEEKLY' ? colors.text.primary : colors.text.secondary }]}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'SEASON' && { backgroundColor: colors.border.default }]}
                onPress={() => {
                    Haptics.selectionAsync();
                    setActiveTab('SEASON');
                }}
            >
                <Crown size={18} color={activeTab === 'SEASON' ? colors.text.primary : colors.text.secondary} />
                <Text style={[styles.tabText, { color: activeTab === 'SEASON' ? colors.text.primary : colors.text.secondary }]}>Season</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'STREAKS' && { backgroundColor: colors.border.default }]}
                onPress={() => {
                    Haptics.selectionAsync();
                    setActiveTab('STREAKS');
                }}
            >
                <Flame size={18} color={activeTab === 'STREAKS' ? COLORS.sunsetOrange : colors.text.secondary} />
                <Text style={[styles.tabText, { color: activeTab === 'STREAKS' ? COLORS.sunsetOrange : colors.text.secondary }]}>Streaks</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'FRIENDS' && { backgroundColor: colors.border.default }]}
                onPress={() => {
                    Haptics.selectionAsync();
                    setActiveTab('FRIENDS');
                }}
            >
                <Users size={18} color={activeTab === 'FRIENDS' ? colors.text.primary : colors.text.secondary} />
                <Text style={[styles.tabText, { color: activeTab === 'FRIENDS' ? colors.text.primary : colors.text.secondary }]}>Friends</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    const renderContent = () => {
        if (isGuest) {
            return (
                <View style={styles.center}>
                    <Lock size={48} color={colors.text.secondary} style={{ marginBottom: 16 }} />
                    <Text style={[styles.guestTitle, { color: colors.text.primary }]}>Guest Mode Active</Text>
                    <Text style={[styles.guestText, { color: colors.text.secondary }]}>Sign in to compete with other agents.</Text>
                </View>
            );
        }

        if (loading && !refreshing) {
            return (
                <View style={{ flex: 1, gap: 10, marginTop: 10 }}>
                    {[1, 2, 3, 4, 5].map((key) => (
                        <View key={key} style={[styles.row, { backgroundColor: colors.background.card, borderColor: colors.border.default, opacity: 0.5 }]}>
                            <Skeleton width={30} height={20} style={{ marginRight: 10 }} />
                            <Skeleton width="60%" height={20} style={{ flex: 1 }} />
                            <Skeleton width={50} height={20} />
                        </View>
                    ))}
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.center}>
                    <Text style={[styles.errorText, { color: colors.feedback.error }]}>{error}</Text>
                    <TouchableOpacity style={[styles.retryButton, { borderColor: colors.feedback.error, backgroundColor: colors.background.secondary }]} onPress={fetchLeaderboard}>
                        <Text style={[styles.retryButtonText, { color: colors.feedback.error }]}>Retry Connection</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.text.accent} />
                }
                ListHeaderComponent={
                    activeTab === 'FRIENDS' ? (
                        <View style={styles.friendBox}>
                            <Text style={[styles.friendTitle, { color: colors.text.primary }]}>Friend Codes</Text>
                            <View style={styles.friendRow}>
                                <TextInput
                                    style={[styles.friendInput, { color: colors.text.primary, borderColor: colors.border.default }]}
                                    placeholder="Enter friend code"
                                    placeholderTextColor={colors.text.secondary}
                                    value={friendInput}
                                    onChangeText={setFriendInput}
                                    autoCapitalize="characters"
                                />
                                <TouchableOpacity
                                    style={[styles.friendButton, { borderColor: colors.text.highlight }]}
                                    onPress={async () => {
                                        const code = friendInput.trim().toUpperCase();
                                        if (!code) return;
                                        const db = await getDb();
                                        await db.runAsync('INSERT OR IGNORE INTO friends (friend_code) VALUES (?)', [code]);
                                        setFriendInput('');
                                        loadFriends();
                                    }}
                                >
                                    <Text style={[styles.friendButtonText, { color: colors.text.primary }]}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={[styles.emptyText, { color: colors.text.primary }]}>No rankings available yet.</Text>
                        <Text style={[styles.emptySubText, { color: colors.text.secondary }]}>Be the first to sync your XP!</Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <LeaderboardItem
                        item={item}
                        index={index}
                        colors={colors}
                        mode={activeTab === 'STREAKS' ? 'STREAK' : activeTab === 'WEEKLY' ? 'WEEKLY' : activeTab === 'SEASON' ? 'SEASON' : 'TOTAL'}
                        total={players.length}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <Text style={[styles.title, { color: colors.text.accent }]}>Rankings</Text>
            {renderTabs()}
            <Text style={[styles.subTitle, { color: colors.text.secondary }]}>Season resets monthly • Weekly resets Mondays</Text>
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 11,
        marginBottom: 10,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 12,
        padding: 4,
        gap: 8,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        gap: 8,
    },
    activeTab: {
        // Handled dynamically
    },
    tabText: {
        fontWeight: '600',
    },
    activeTabText: {
        fontWeight: 'bold',
    },
    empty: {
        marginTop: 50,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptySubText: {
        fontSize: 14,
        marginTop: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
    },
    rankBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rank: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    playerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
    secondaryInfo: {
        fontSize: 12,
        marginTop: 2,
    },
    xp: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tierBadge: {
        marginLeft: 8,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    tierText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    guestTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    guestText: {
        marginTop: 8,
        textAlign: 'center',
    },
    errorText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
    },
    retryButtonText: {
        fontWeight: 'bold',
    },
    friendBox: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(110, 44, 243, 0.3)',
        backgroundColor: 'rgba(110, 44, 243, 0.08)',
    },
    friendTitle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    friendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    friendInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 12,
    },
    friendButton: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    friendButtonText: {
        fontSize: 12,
        fontWeight: '700',
    },
});

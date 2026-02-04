import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { getDb } from '../db/client';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Users, BarChart3 } from 'lucide-react-native';

type Tab = 'LOCAL' | 'FRIENDS';

interface DailyRow {
    day: string;
    xp: number;
    total: number;
    correct: number;
}

interface FriendRow {
    friend_code: string;
    alias?: string | null;
}

export const LeaderboardScreen = () => {
    const { stats, friendCode, username } = useStore();
    const { colors } = useTheme();
    const [activeTab, setActiveTab] = useState<Tab>('LOCAL');
    const [daily, setDaily] = useState<DailyRow[]>([]);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [aiChoiceRate, setAiChoiceRate] = useState(0);
    const [friends, setFriends] = useState<FriendRow[]>([]);
    const [friendInput, setFriendInput] = useState('');
    const [aliasInput, setAliasInput] = useState('');

    const loadLocalStats = async () => {
        const db = await getDb();
        const totals = await db.getFirstAsync<{ total: number; correct: number; ai_choice: number }>(
            'SELECT COUNT(*) as total, SUM(is_correct) as correct, SUM(CASE WHEN chosen_human = 0 THEN 1 ELSE 0 END) as ai_choice FROM quiz_results'
        );
        const dailyRows = await db.getAllAsync<DailyRow>(
            `SELECT strftime('%Y-%m-%d', created_at) as day,
                    SUM(xp_earned) as xp,
                    COUNT(*) as total,
                    SUM(is_correct) as correct
             FROM quiz_results
             GROUP BY day
             ORDER BY day DESC
             LIMIT 7`
        );
        const total = totals?.total || 0;
        const correct = totals?.correct || 0;
        const aiChoice = totals?.ai_choice || 0;
        setTotalGuesses(total);
        setTotalCorrect(correct);
        setAiChoiceRate(total > 0 ? Math.round((aiChoice / total) * 100) : 0);
        setDaily(dailyRows);
    };

    const loadFriends = async () => {
        const db = await getDb();
        const rows = await db.getAllAsync<FriendRow>('SELECT friend_code, alias FROM friends ORDER BY added_at DESC');
        setFriends(rows);
    };

    useEffect(() => {
        loadLocalStats();
        loadFriends();
    }, []);

    const handleAddFriend = async () => {
        const code = friendInput.trim().toUpperCase();
        if (!code) return;
        try {
            const db = await getDb();
            await db.runAsync(
                'INSERT OR IGNORE INTO friends (friend_code, alias) VALUES (?, ?)',
                [code, aliasInput.trim() || null]
            );
            setFriendInput('');
            setAliasInput('');
            loadFriends();
        } catch {
            Alert.alert('Error', 'Could not add friend.');
        }
    };

    const handleRemoveFriend = async (code: string) => {
        try {
            const db = await getDb();
            await db.runAsync('DELETE FROM friends WHERE friend_code = ?', [code]);
            loadFriends();
        } catch {
            Alert.alert('Error', 'Could not remove friend.');
        }
    };

    const accuracy = totalGuesses > 0 ? Math.round((totalCorrect / totalGuesses) * 100) : 0;

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <Text style={[styles.title, { color: colors.text.accent }]}>Local Leaderboard</Text>

            <View style={[styles.tabRow, { backgroundColor: colors.background.secondary }]}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'LOCAL' && { backgroundColor: colors.border.default }]}
                    onPress={() => setActiveTab('LOCAL')}
                    accessibilityRole="button"
                    accessibilityLabel="Local stats tab"
                    accessibilityState={{ selected: activeTab === 'LOCAL' }}
                >
                    <BarChart3 size={16} color={activeTab === 'LOCAL' ? colors.text.primary : colors.text.secondary} />
                    <Text style={[styles.tabText, { color: activeTab === 'LOCAL' ? colors.text.primary : colors.text.secondary }]}>Local</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'FRIENDS' && { backgroundColor: colors.border.default }]}
                    onPress={() => setActiveTab('FRIENDS')}
                    accessibilityRole="button"
                    accessibilityLabel="Friends tab"
                    accessibilityState={{ selected: activeTab === 'FRIENDS' }}
                >
                    <Users size={16} color={activeTab === 'FRIENDS' ? colors.text.primary : colors.text.secondary} />
                    <Text style={[styles.tabText, { color: activeTab === 'FRIENDS' ? colors.text.primary : colors.text.secondary }]}>Friends</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'LOCAL' && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.card, { borderColor: colors.border.default, backgroundColor: colors.background.card }, NEON_SHADOWS.subtle]}>
                        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Agent</Text>
                        <Text style={[styles.cardText, { color: colors.text.secondary }]}>
                            {username || 'Offline Agent'} • {friendCode || 'No Code'}
                        </Text>
                    </View>

                    <View style={styles.statGrid}>
                        <View style={[styles.statCard, { borderColor: COLORS.neonPurple }, NEON_SHADOWS.subtle]}>
                            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Total XP</Text>
                            <Text style={[styles.statValue, { color: COLORS.neonPurple }]}>{stats.totalXp}</Text>
                        </View>
                        <View style={[styles.statCard, { borderColor: COLORS.sunsetOrange }, NEON_SHADOWS.subtle]}>
                            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Best Streak</Text>
                            <Text style={[styles.statValue, { color: COLORS.sunsetOrange }]}>{stats.maxStreak}</Text>
                        </View>
                    </View>

                    <View style={styles.statGrid}>
                        <View style={[styles.statCard, { borderColor: COLORS.neonCyan }, NEON_SHADOWS.subtle]}>
                            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Accuracy</Text>
                            <Text style={[styles.statValue, { color: COLORS.neonCyan }]}>{accuracy}%</Text>
                        </View>
                        <View style={[styles.statCard, { borderColor: COLORS.neonPink }, NEON_SHADOWS.subtle]}>
                            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>AI Choice</Text>
                            <Text style={[styles.statValue, { color: COLORS.neonPink }]}>{aiChoiceRate}%</Text>
                        </View>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Last 7 Days</Text>
                    {daily.length === 0 && (
                        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>No activity yet.</Text>
                    )}
                    {daily.map((row, index) => {
                        const dayAccuracy = row.total > 0 ? Math.round((row.correct / row.total) * 100) : 0;
                        return (
                            <Animated.View
                                key={`${row.day}-${index}`}
                                entering={FadeInDown.delay(index * 40).springify()}
                                style={[styles.dailyRow, { backgroundColor: colors.background.card, borderColor: colors.border.default }]}
                            >
                                <Text style={[styles.dailyDate, { color: colors.text.primary }]}>{row.day}</Text>
                                <Text style={[styles.dailyMeta, { color: colors.text.secondary }]}>
                                    {row.xp || 0} XP • {dayAccuracy}% • {row.total} plays
                                </Text>
                            </Animated.View>
                        );
                    })}
                </ScrollView>
            )}

            {activeTab === 'FRIENDS' && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.card, { borderColor: colors.border.default, backgroundColor: colors.background.card }, NEON_SHADOWS.subtle]}>
                        <Text style={[styles.cardTitle, { color: colors.text.primary }]}>Add Friend</Text>
                        <Text style={[styles.cardText, { color: colors.text.secondary }]}>Store codes locally for quick sharing.</Text>
                        <TextInput
                            style={[styles.input, { color: colors.text.primary, borderColor: colors.border.default }]}
                            value={friendInput}
                            onChangeText={setFriendInput}
                            placeholder="Friend Code (e.g. GUEST-ABC123)"
                            placeholderTextColor={colors.text.secondary}
                            autoCapitalize="characters"
                        />
                        <TextInput
                            style={[styles.input, { color: colors.text.primary, borderColor: colors.border.default }]}
                            value={aliasInput}
                            onChangeText={setAliasInput}
                            placeholder="Alias (optional)"
                            placeholderTextColor={colors.text.secondary}
                        />
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: colors.text.highlight, borderColor: colors.text.highlight }]}
                            onPress={handleAddFriend}
                            accessibilityRole="button"
                            accessibilityLabel="Add friend"
                        >
                            <Text style={[styles.addButtonText, { color: colors.text.primary }]}>Save Friend</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Saved Friends</Text>
                    {friends.length === 0 && (
                        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>No friends saved yet.</Text>
                    )}
                    {friends.map((friend, index) => (
                        <Animated.View
                            key={`${friend.friend_code}-${index}`}
                            entering={FadeInDown.delay(index * 40).springify()}
                            style={[styles.friendRow, { backgroundColor: colors.background.card, borderColor: colors.border.default }]}
                        >
                            <View style={styles.friendInfo}>
                                <Text style={[styles.friendCode, { color: colors.text.primary }]}>{friend.friend_code}</Text>
                                {friend.alias && (
                                    <Text style={[styles.friendAlias, { color: colors.text.secondary }]}>{friend.alias}</Text>
                                )}
                            </View>
                            <TouchableOpacity onPress={() => handleRemoveFriend(friend.friend_code)}>
                                <Text style={[styles.removeText, { color: colors.feedback.error }]}>Remove</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tabRow: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 6,
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    tabText: {
        fontSize: 12,
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    card: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 12,
    },
    statGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    statCard: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 14,
        padding: 16,
        backgroundColor: 'rgba(10, 14, 41, 0.6)',
    },
    statLabel: {
        fontSize: 12,
        marginBottom: 6,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
    },
    sectionTitle: {
        fontSize: 13,
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontWeight: '800',
        marginTop: 10,
        marginBottom: 8,
    },
    dailyRow: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
    },
    dailyDate: {
        fontSize: 14,
        fontWeight: '700',
    },
    dailyMeta: {
        fontSize: 12,
        marginTop: 4,
    },
    emptyText: {
        fontSize: 12,
        opacity: 0.8,
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 10,
    },
    addButton: {
        marginTop: 12,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: '700',
    },
    friendRow: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    friendInfo: {
        flex: 1,
    },
    friendCode: {
        fontSize: 14,
        fontWeight: '700',
    },
    friendAlias: {
        fontSize: 12,
        marginTop: 4,
    },
    removeText: {
        fontSize: 12,
        fontWeight: '700',
    },
});

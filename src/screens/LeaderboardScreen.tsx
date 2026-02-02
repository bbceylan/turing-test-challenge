import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { supabase } from '../utils/supabase';
import { useStore } from '../store/useStore';
import { Globe, Calendar, Lock } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Skeleton } from '../components/Skeleton';

interface Player {
    id: string;
    username: string;
    total_xp: number;
}

type Tab = 'GLOBAL' | 'WEEKLY';

// Extracted & Memoized Item Component for Performance
const LeaderboardItem = React.memo(({ item, index, colors }: { item: Player; index: number, colors: any }) => (
    <Animated.View
        entering={FadeInDown.delay(index * 50).springify()}
        style={[styles.row, {
            backgroundColor: colors.background.card,
            borderColor: colors.border.default
        }]}
    >
        <Text style={[styles.rank, { color: colors.text.accent }]}>#{index + 1}</Text>
        <Text style={[styles.name, { color: colors.text.primary }]}>{item.username || 'Anonymous Agent'}</Text>
        <Text style={[styles.xp, { color: colors.text.highlight }]}>{item.total_xp} XP</Text>
    </Animated.View>
));

export const LeaderboardScreen = () => {
    const { isGuest } = useStore();
    const { colors } = useTheme();
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<Tab>('GLOBAL');
    const [error, setError] = useState<string | null>(null);

    const fetchLeaderboard = React.useCallback(async () => {
        if (isGuest) {
            setLoading(false);
            setRefreshing(false);
            return;
        }

        setError(null);
        try {
            const query = supabase
                .from('profiles')
                .select('id, username, total_xp')
                .order('total_xp', { ascending: false })
                .limit(activeTab === 'GLOBAL' ? 50 : 10);

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
    }, [activeTab, isGuest]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    const renderTabs = () => (
        <View style={[styles.tabContainer, { backgroundColor: colors.background.secondary }]}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'GLOBAL' && { backgroundColor: colors.border.default }]}
                onPress={() => setActiveTab('GLOBAL')}
            >
                <Globe size={20} color={activeTab === 'GLOBAL' ? colors.text.primary : colors.text.secondary} />
                <Text style={[styles.tabText, { color: activeTab === 'GLOBAL' ? colors.text.primary : colors.text.secondary }]}>Global</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'WEEKLY' && { backgroundColor: colors.border.default }]}
                onPress={() => setActiveTab('WEEKLY')}
            >
                <Calendar size={20} color={activeTab === 'WEEKLY' ? colors.text.primary : colors.text.secondary} />
                <Text style={[styles.tabText, { color: activeTab === 'WEEKLY' ? colors.text.primary : colors.text.secondary }]}>Weekly</Text>
            </TouchableOpacity>
        </View>
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
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={[styles.emptyText, { color: colors.text.primary }]}>No rankings available yet.</Text>
                        <Text style={[styles.emptySubText, { color: colors.text.secondary }]}>Be the first to sync your XP!</Text>
                    </View>
                }
                renderItem={({ item, index }) => <LeaderboardItem item={item} index={index} colors={colors} />}
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
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
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
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 40,
    },
    name: {
        fontSize: 16,
        flex: 1,
    },
    xp: {
        fontSize: 16,
        fontWeight: 'bold',
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
});

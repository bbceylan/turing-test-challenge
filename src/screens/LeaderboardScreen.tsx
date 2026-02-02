import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants/theme';
import { supabase } from '../utils/supabase';
import { useStore } from '../store/useStore';
import { Globe, Calendar, Lock } from 'lucide-react-native';

interface Player {
    id: string;
    username: string;
    total_xp: number;
}

type Tab = 'GLOBAL' | 'WEEKLY';

// Extracted & Memoized Item Component for Performance
const LeaderboardItem = React.memo(({ item, index }: { item: Player; index: number }) => (
    <View style={styles.row}>
        <Text style={styles.rank}>#{index + 1}</Text>
        <Text style={styles.name}>{item.username || 'Anonymous Agent'}</Text>
        <Text style={styles.xp}>{item.total_xp} XP</Text>
    </View>
));

export const LeaderboardScreen = () => {
    const { isGuest } = useStore();
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
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'GLOBAL' && styles.activeTab]}
                onPress={() => setActiveTab('GLOBAL')}
            >
                <Globe size={20} color={activeTab === 'GLOBAL' ? COLORS.white : COLORS.gray} />
                <Text style={[styles.tabText, activeTab === 'GLOBAL' && styles.activeTabText]}>Global</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'WEEKLY' && styles.activeTab]}
                onPress={() => setActiveTab('WEEKLY')}
            >
                <Calendar size={20} color={activeTab === 'WEEKLY' ? COLORS.white : COLORS.gray} />
                <Text style={[styles.tabText, activeTab === 'WEEKLY' && styles.activeTabText]}>Weekly</Text>
            </TouchableOpacity>
        </View>
    );

    const renderContent = () => {
        if (isGuest) {
            return (
                <View style={styles.center}>
                    <Lock size={48} color={COLORS.gray} style={{ marginBottom: 16 }} />
                    <Text style={styles.guestTitle}>Guest Mode Active</Text>
                    <Text style={styles.guestText}>Sign in to compete with other agents.</Text>
                </View>
            );
        }

        if (loading && !refreshing) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator color={COLORS.cyan} size="large" />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.center}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchLeaderboard}>
                        <Text style={styles.retryButtonText}>Retry Connection</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.pink} />
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No rankings available yet.</Text>
                        <Text style={styles.emptySubText}>Be the first to sync your XP!</Text>
                    </View>
                }
                renderItem={({ item, index }) => <LeaderboardItem item={item} index={index} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rankings</Text>
            {renderTabs()}
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.navy,
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
        color: COLORS.pink,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
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
        backgroundColor: COLORS.purple,
    },
    tabText: {
        color: COLORS.gray,
        fontWeight: '600',
    },
    activeTabText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    empty: {
        marginTop: 50,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptySubText: {
        color: COLORS.gray,
        fontSize: 14,
        marginTop: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(110, 44, 243, 0.3)',
    },
    rank: {
        color: COLORS.cyan,
        fontSize: 18,
        fontWeight: 'bold',
        width: 40,
    },
    name: {
        color: COLORS.white,
        fontSize: 16,
        flex: 1,
    },
    xp: {
        color: COLORS.pink,
        fontSize: 16,
        fontWeight: 'bold',
    },
    guestTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    guestText: {
        color: COLORS.gray,
        marginTop: 8,
        textAlign: 'center',
    },
    errorText: {
        color: COLORS.gray,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 45, 171, 0.2)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.pink,
    },
    retryButtonText: {
        color: COLORS.pink,
        fontWeight: 'bold',
    },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';
import { supabase } from '../utils/supabase';

interface Player {
    id: string;
    username: string;
    total_xp: number;
}

export const LeaderboardScreen = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchLeaderboard = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, username, total_xp')
                .order('total_xp', { ascending: false })
                .limit(20);

            if (error) throw error;
            setPlayers(data || []);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchLeaderboard();
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={COLORS.cyan} size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Global Rankings</Text>
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
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Text style={styles.rank}>#{index + 1}</Text>
                        <Text style={styles.name}>{item.username || 'Anonymous Agent'}</Text>
                        <Text style={styles.xp}>{item.total_xp} XP</Text>
                    </View>
                )}
            />
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
        backgroundColor: COLORS.navy,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: COLORS.pink,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    empty: {
        marginTop: 100,
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
});

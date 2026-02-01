import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { COLORS } from '../constants/theme';

export const LeaderboardScreen = () => {
    // Placeholder data
    const players = [
        { id: '1', name: 'CyberGuessr', xp: 2500 },
        { id: '2', name: 'TuringMaster', xp: 2100 },
        { id: '3', name: 'AiHunter', xp: 1800 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Global Rankings</Text>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Text style={styles.rank}>#{index + 1}</Text>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.xp}>{item.xp} XP</Text>
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
    title: {
        color: COLORS.pink,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
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

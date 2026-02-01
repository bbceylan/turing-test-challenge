import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { COLORS } from '../constants/theme';
import { getDb } from '../db/client';
import { CheckCircle2, Circle } from 'lucide-react-native';

export const MilestoneScreen = () => {
    const [milestones, setMilestones] = useState<any[]>([]);

    useEffect(() => {
        loadMilestones();
    }, []);

    const loadMilestones = async () => {
        const db = await getDb();
        const results = await db.getAllAsync('SELECT * FROM milestones');
        setMilestones(results);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Achievements</Text>
            <FlatList
                data={milestones}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.card, item.completed_at && styles.completedCard]}>
                        <View style={styles.info}>
                            <Text style={styles.milestoneTitle}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                        {item.completed_at ? (
                            <CheckCircle2 color={COLORS.cyan} size={24} />
                        ) : (
                            <Circle color={COLORS.gray} size={24} />
                        )}
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
        color: COLORS.white,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    completedCard: {
        borderColor: COLORS.cyan,
        backgroundColor: 'rgba(0, 240, 255, 0.05)',
    },
    info: {
        flex: 1,
    },
    milestoneTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        color: COLORS.gray,
        fontSize: 14,
    },
});

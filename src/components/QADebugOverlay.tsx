import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useStore } from '../store/useStore';
import { COLORS } from '../constants/theme';

export const QADebugOverlay = () => {
    const {
        qaOverlay,
        setQaOverlay,
        stats,
        isPro,
        friendCode,
    } = useStore();

    if (!qaOverlay) return null;

    return (
        <View style={styles.container} pointerEvents="box-none">
            <View style={styles.card} accessible accessibilityLabel="QA Debug Overlay">
                <View style={styles.headerRow}>
                    <Text style={styles.title}>QA OVERLAY</Text>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={() => setQaOverlay(false)}
                        accessibilityRole="button"
                        accessibilityLabel="Close QA overlay"
                    >
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.line}>Mode: OFFLINE</Text>
                <Text style={styles.line}>Pro: {isPro ? 'YES' : 'NO'}</Text>
                <Text style={styles.line}>Friend Code: {friendCode || 'NONE'}</Text>
                <Text style={styles.line}>XP: {stats.totalXp}</Text>
                <Text style={styles.line}>Streak: {stats.currentStreak} (Max {stats.maxStreak})</Text>
                <Text style={styles.line}>Daily Streak: {stats.dailyStreak}</Text>
                <Text style={styles.line}>Weekly XP: {stats.weeklyXp}</Text>
                <Text style={styles.line}>Season XP: {stats.seasonXp}</Text>
                <Text style={styles.line}>Shields: {stats.streakShields}</Text>
                <Text style={styles.line}>Ghost Best: {stats.ghostBestScore}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        left: 10,
        right: 10,
        zIndex: 999,
    },
    card: {
        backgroundColor: 'rgba(10, 14, 41, 0.95)',
        borderWidth: 1,
        borderColor: COLORS.neonCyan,
        borderRadius: 12,
        padding: 12,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        color: COLORS.neonCyan,
        fontSize: 12,
        letterSpacing: 2,
        fontWeight: '800',
    },
    close: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: COLORS.neonPink,
        borderRadius: 8,
    },
    closeText: {
        color: COLORS.neonPink,
        fontSize: 12,
        fontWeight: '800',
    },
    line: {
        color: COLORS.white,
        fontSize: 11,
        marginBottom: 4,
    },
});

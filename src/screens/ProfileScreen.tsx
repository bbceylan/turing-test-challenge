import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { useStore } from '../store/useStore';

import { supabase } from '../utils/supabase';

export const ProfileScreen = () => {
    const { stats } = useStore();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agent Profile</Text>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Total XP</Text>
                    <Text style={styles.statValue}>{stats.totalXp}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Best Streak</Text>
                    <Text style={styles.statValue}>{stats.maxStreak}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.premiumButton]}>
                <Text style={styles.buttonText}>Go Ad-Free</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
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
        color: COLORS.cyan,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 40,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'rgba(0, 240, 255, 0.05)',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 240, 255, 0.2)',
        alignItems: 'center',
    },
    statLabel: {
        color: COLORS.gray,
        fontSize: 14,
        marginBottom: 5,
    },
    statValue: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'rgba(110, 44, 243, 0.2)',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.purple,
    },
    premiumButton: {
        backgroundColor: COLORS.pink,
        borderColor: COLORS.pink,
    },
    signOutButton: {
        marginTop: 20,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 45, 171, 0.3)',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

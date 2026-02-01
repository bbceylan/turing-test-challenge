import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';
import { useStore } from '../store/useStore';
import { supabase } from '../utils/supabase';
import { User, Edit3, Check, X } from 'lucide-react-native';

export const ProfileScreen = () => {
    const { stats, session, user } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', user?.id)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            if (data) setUsername(data.username || '');
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleUpdateUsername = async () => {
        if (!username.trim()) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user?.id,
                    username: username.trim(),
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;
            setIsEditing(false);
            Alert.alert('Profile updated!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Could not update username');
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agent Profile</Text>

            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <User color={COLORS.cyan} size={40} />
                </View>
                <View style={styles.profileInfo}>
                    {isEditing ? (
                        <View style={styles.editRow}>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Agent Name"
                                placeholderTextColor={COLORS.gray}
                                autoFocus
                            />
                            <TouchableOpacity onPress={handleUpdateUsername} disabled={loading}>
                                {loading ? <ActivityIndicator size="small" color={COLORS.cyan} /> : <Check color={COLORS.cyan} size={24} />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsEditing(false)}>
                                <X color={COLORS.pink} size={24} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.editRow} onPress={() => setIsEditing(true)}>
                            <Text style={styles.username}>{username || 'Click to set name'}</Text>
                            <Edit3 color={COLORS.gray} size={16} style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.email}>{session?.user.email}</Text>
                </View>
            </View>

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
                <Text style={styles.buttonText}>Achievements</Text>
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
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        padding: 20,
        backgroundColor: 'rgba(0, 240, 255, 0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 240, 255, 0.1)',
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderWidth: 1,
        borderColor: COLORS.cyan,
    },
    profileInfo: {
        flex: 1,
    },
    username: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    editRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: COLORS.white,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.cyan,
        paddingVertical: 4,
        marginRight: 10,
    },
    email: {
        color: COLORS.gray,
        fontSize: 14,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 40,
    },
    statBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
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

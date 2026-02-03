import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator, Share } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { supabase } from '../utils/supabase';
import { User, Edit3, Check, X, Share2 } from 'lucide-react-native';
import { COLORS, NEON_SHADOWS } from '../constants/theme';

export const ProfileScreen = () => {
    const { stats, session, user, isGuest, setGuest, isPro } = useStore();
    const { colors } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && !isGuest) {
            fetchProfile();
        } else if (isGuest) {
            setUsername('Guest Agent');
        }
    }, [user, isGuest]);

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
        if (isGuest) {
            Alert.alert('Guest Mode', 'Sign in to save your agent name!');
            return;
        }
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
        if (isGuest) {
            setGuest(false); // Return to Auth Screen
        } else {
            await supabase.auth.signOut();
        }
    };

    const handleInvite = async () => {
        try {
            await Share.share({
                message: "Challenge me in the Turing Test! 🤖🎨 Can you spot the human? Download the app now and start your streak!",
            });
        } catch (error) {
            console.error('Error sharing invitation:', error);
        }
    };

    const handlePurchase = async () => {
        if (isGuest) {
            Alert.alert('Guest Mode', 'Please sign in to upgrade to Pro.');
            return;
        }

        try {
            const { NativeModules } = require('react-native');
            if (!NativeModules.RNPurchases) {
                Alert.alert('Development Mode', 'In-App Purchases require a native build (not Expo Go).\n\nIf you are a developer, set `isPro: true` in the store manually.');
                return;
            }

            const Purchases = require('react-native-purchases').default;

            try {
                Alert.alert('Coming Soon', 'The Pro subscription is not yet configured in RevenueCat.');
            } catch (e: any) {
                Alert.alert('Store Error', e.message);
            }

        } catch (error) {
            console.warn('Purchase flow failed:', error);
            Alert.alert('Error', 'Could not initiate purchase flow.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <Text style={[styles.title, { color: colors.text.accent }]}>Agent Profile</Text>

            <View style={[styles.profileHeader, { backgroundColor: colors.background.card, borderColor: colors.border.default }]}>
                <View style={[styles.avatarContainer, { backgroundColor: colors.background.secondary, borderColor: COLORS.neonCyan }, NEON_SHADOWS.cyan]}>
                    <User color={COLORS.neonCyan} size={40} />
                </View>
                <View style={styles.profileInfo}>
                    {isEditing ? (
                        <View style={styles.editRow}>
                            <TextInput
                                style={[styles.input, { color: colors.text.primary, borderBottomColor: colors.border.active }]}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Agent Name"
                                placeholderTextColor={colors.text.secondary}
                                autoFocus
                            />
                            <TouchableOpacity onPress={handleUpdateUsername} disabled={loading}>
                                {loading ? <ActivityIndicator size="small" color={colors.text.accent} /> : <Check color={colors.text.accent} size={24} />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsEditing(false)}>
                                <X color={colors.feedback.error} size={24} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.editRow} onPress={() => !isGuest && setIsEditing(true)}>
                            <Text style={[styles.username, { color: colors.text.primary }]}>{username || 'Click to set name'}</Text>
                            {!isGuest && <Edit3 color={colors.text.secondary} size={16} style={{ marginLeft: 8 }} />}
                        </TouchableOpacity>
                    )}
                    <Text style={[styles.email, { color: colors.text.secondary }]}>{isGuest ? 'Offline Mode' : session?.user.email}</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={[styles.statBox, { backgroundColor: colors.background.card, borderColor: COLORS.neonPurple }, NEON_SHADOWS.subtle]}>
                    <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Total XP</Text>
                    <Text style={[styles.statValue, { color: COLORS.neonPurple }]}>{stats.totalXp}</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: colors.background.card, borderColor: COLORS.sunsetOrange }, NEON_SHADOWS.subtle]}>
                    <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Best Streak</Text>
                    <Text style={[styles.statValue, { color: COLORS.sunsetOrange }]}>{stats.maxStreak}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.background.secondary, borderColor: colors.border.default }]}
                accessibilityRole="button"
                accessibilityLabel="View Achievements"
                accessibilityHint="See your earned achievements and progress"
            >
                <Text style={[styles.buttonText, { color: colors.text.primary }]}>Achievements</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.background.secondary, borderColor: colors.border.default }]}
                onPress={handleInvite}
                accessibilityRole="button"
                accessibilityLabel="Invite Friends"
                accessibilityHint="Share the app with your friends"
            >
                <Text style={[styles.buttonText, { color: colors.text.primary }]}>Invite Friends</Text>
            </TouchableOpacity>

            {!isPro && (
                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.premiumButton,
                        { backgroundColor: colors.text.highlight, borderColor: colors.text.highlight }
                    ]}
                    onPress={handlePurchase}
                    accessibilityRole="button"
                    accessibilityLabel="Go Ad-Free"
                    accessibilityHint="Purchase Pro subscription to remove ads"
                >
                    <Text style={[styles.buttonText, { color: colors.text.primary }]}>Go Ad-Free</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[
                    styles.button,
                    styles.signOutButton,
                    { borderColor: colors.feedback.error }
                ]}
                onPress={handleSignOut}
                accessibilityRole="button"
                accessibilityLabel={isGuest ? "Sign In" : "Sign Out"}
                accessibilityHint={isGuest ? "Sign in to your account" : "Sign out of your account"}
            >
                <Text style={[styles.buttonText, { color: colors.text.primary }]}>{isGuest ? 'Sign Up / Sign In' : 'Sign Out'}</Text>
            </TouchableOpacity>
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
        marginBottom: 30,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderWidth: 1,
    },
    profileInfo: {
        flex: 1,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 18,
        borderBottomWidth: 1,
        paddingVertical: 4,
        marginRight: 10,
    },
    email: {
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
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        marginBottom: 5,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
    },
    premiumButton: {
        // Overrides in inline styles
    },
    signOutButton: {
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

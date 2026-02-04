import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Share, TextInput, ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { User, Edit3, Check, X } from 'lucide-react-native';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import { purchasePro, restoreProPurchases } from '../utils/iap';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export const ProfileScreen = () => {
    const { stats, isPro, setIsPro, friendCode, qaOverlay, setQaOverlay, username, setUsername } = useStore();
    const { colors } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [draftName, setDraftName] = useState('');
    const [savingName, setSavingName] = useState(false);
    const [analytics, setAnalytics] = useState<{ accuracy: number; total: number; aiChoiceRate: number; topMissCategory: string | null }>({
        accuracy: 0,
        total: 0,
        aiChoiceRate: 0,
        topMissCategory: null,
    });
    const proPulse = useSharedValue(1);

    useEffect(() => {
        setDraftName(username || 'Offline Agent');
    }, [username]);

    useEffect(() => {
        if (!isPro) {
            proPulse.value = 1;
            return;
        }
        proPulse.value = withRepeat(
            withTiming(1.08, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, [isPro]);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const db = await (await import('../db/client')).getDb();
                const totals = await db.getFirstAsync<{ total: number; correct: number; ai_choice: number }>(
                    'SELECT COUNT(*) as total, SUM(is_correct) as correct, SUM(CASE WHEN chosen_human = 0 THEN 1 ELSE 0 END) as ai_choice FROM quiz_results'
                );
                const misses = await db.getFirstAsync<{ category: string; misses: number }>(
                    'SELECT category, COUNT(*) as misses FROM quiz_results WHERE is_correct = 0 GROUP BY category ORDER BY misses DESC LIMIT 1'
                );
                const total = totals?.total || 0;
                const correct = totals?.correct || 0;
                const aiChoice = totals?.ai_choice || 0;
                setAnalytics({
                    accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
                    total,
                    aiChoiceRate: total > 0 ? Math.round((aiChoice / total) * 100) : 0,
                    topMissCategory: misses?.category || null,
                });
            } catch {
                // Ignore analytics errors
            }
        };
        loadAnalytics();
    }, []);

    const handleInvite = async () => {
        try {
            await Share.share({
                message: "Challenge me in the Turing Test! 🤖🎨 Can you spot the human? Download the app now and start your streak!",
            });
        } catch (error) {
            console.error('Error sharing invitation:', error);
        }
    };

    const handleShareFriendCode = async () => {
        if (!friendCode) return;
        try {
            await Share.share({
                message: `Add me on Turing Test! Friend code: ${friendCode}`,
            });
        } catch (error) {
            console.error('Error sharing friend code:', error);
        }
    };

    const handlePurchase = async () => {
        try {
            const { NativeModules } = require('react-native');
            if (!NativeModules.RNIapModule && !NativeModules.RNIapIos && !NativeModules.RNIapAmazonModule) {
                Alert.alert('Development Mode', 'In-App Purchases require a native build (not Expo Go).\n\nIf you are a developer, set `isPro: true` in the store manually.');
                return;
            }
            const purchase = await purchasePro();
            if (purchase) {
                setIsPro(true);
                Alert.alert('Success', 'Pro unlocked. Enjoy ad-free play!');
            }
        } catch (error) {
            console.warn('Purchase flow failed:', error);
            Alert.alert('Error', 'Could not initiate purchase flow.');
        }
    };

    const handleRestorePurchase = async () => {
        try {
            const restored = await restoreProPurchases();
            if (restored) {
                setIsPro(true);
                Alert.alert('Restored', 'Your Pro unlock has been restored.');
            } else {
                Alert.alert('No Purchases', 'No previous purchases were found for this account.');
            }
        } catch {
            Alert.alert('Error', 'Could not restore purchases.');
        }
    };

    const proBadgeStyle = useAnimatedStyle(() => ({
        transform: [{ scale: proPulse.value }],
    }));

    const handleUpdateUsername = async () => {
        const next = draftName.trim();
        if (!next) return;
        setSavingName(true);
        try {
            setUsername(next);
            setIsEditing(false);
        } finally {
            setSavingName(false);
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
                                value={draftName}
                                onChangeText={setDraftName}
                                placeholder="Agent Name"
                                placeholderTextColor={colors.text.secondary}
                                autoFocus
                                autoCapitalize="words"
                                maxLength={30}
                            />
                            <TouchableOpacity onPress={handleUpdateUsername} disabled={savingName}>
                                {savingName ? <ActivityIndicator size="small" color={colors.text.accent} /> : <Check color={colors.text.accent} size={24} />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setIsEditing(false); setDraftName(username || 'Offline Agent'); }}>
                                <X color={colors.feedback.error} size={24} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.editRow} onPress={() => setIsEditing(true)}>
                            <Text style={[styles.username, { color: colors.text.primary }]}>{username || 'Offline Agent'}</Text>
                            <Edit3 color={colors.text.secondary} size={16} style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    )}
                    <View style={styles.badgeRow}>
                        <Animated.View style={isPro ? proBadgeStyle : undefined}>
                        <Text style={[styles.badgeText, { color: isPro ? COLORS.neonCyan : colors.text.secondary }]}>
                            {isPro ? 'Pro Agent' : 'Free Agent'}
                        </Text>
                        </Animated.View>
                    </View>
                    <Text style={[styles.email, { color: colors.text.secondary }]}>Offline Mode</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View
                    style={[styles.statBox, { backgroundColor: colors.background.card, borderColor: COLORS.neonPurple }, NEON_SHADOWS.subtle]}
                    accessible
                    accessibilityLabel={`Total XP ${stats.totalXp}`}
                >
                    <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Total XP</Text>
                    <Text style={[styles.statValue, { color: COLORS.neonPurple }]}>{stats.totalXp}</Text>
                </View>
                <View
                    style={[styles.statBox, { backgroundColor: colors.background.card, borderColor: COLORS.sunsetOrange }, NEON_SHADOWS.subtle]}
                    accessible
                    accessibilityLabel={`Best streak ${stats.maxStreak}`}
                >
                    <Text style={[styles.statLabel, { color: colors.text.secondary }]}>Best Streak</Text>
                    <Text style={[styles.statValue, { color: COLORS.sunsetOrange }]}>{stats.maxStreak}</Text>
                </View>
            </View>

            <View
                style={[styles.insightsBox, { borderColor: colors.border.default }]}
                accessible
                accessibilityLabel={`Insights. Accuracy ${analytics.accuracy} percent. AI choice rate ${analytics.aiChoiceRate} percent.${analytics.topMissCategory ? ` Most missed ${analytics.topMissCategory}.` : ''}`}
            >
                <Text style={[styles.insightsTitle, { color: colors.text.primary }]}>Insights</Text>
                <Text style={[styles.insightsText, { color: colors.text.secondary }]}>Accuracy: {analytics.accuracy}% ({analytics.total} attempts)</Text>
                <Text style={[styles.insightsText, { color: colors.text.secondary }]}>AI Choice Rate: {analytics.aiChoiceRate}%</Text>
                {analytics.topMissCategory && (
                    <Text style={[styles.insightsText, { color: colors.text.secondary }]}>Most Missed: {analytics.topMissCategory}</Text>
                )}
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

            {friendCode && (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.background.secondary, borderColor: colors.border.default }]}
                    onPress={handleShareFriendCode}
                    accessibilityRole="button"
                    accessibilityLabel="Share Friend Code"
                    accessibilityHint="Share your friend code"
                >
                    <Text style={[styles.buttonText, { color: colors.text.primary }]}>Share Friend Code: {friendCode}</Text>
                </TouchableOpacity>
            )}

            {!isPro && (
                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.premiumButton,
                        { backgroundColor: colors.text.highlight, borderColor: colors.text.highlight }
                    ]}
                    onPress={handlePurchase}
                    accessibilityRole="button"
                    accessibilityLabel="Unlock Pro"
                    accessibilityHint="One-time purchase to unlock Pro"
                >
                    <Text style={[styles.buttonText, { color: colors.text.primary }]}>Unlock Pro</Text>
                </TouchableOpacity>
            )}

            {!isPro && (
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: colors.background.secondary, borderColor: colors.border.default }
                    ]}
                    onPress={handleRestorePurchase}
                    accessibilityRole="button"
                    accessibilityLabel="Restore Purchases"
                    accessibilityHint="Restore your previous Pro purchase"
                >
                    <Text style={[styles.buttonText, { color: colors.text.primary }]}>Restore Purchase</Text>
                </TouchableOpacity>
            )}

            {__DEV__ && (
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: colors.background.secondary, borderColor: colors.border.default }
                    ]}
                    onPress={() => setQaOverlay(!qaOverlay)}
                    accessibilityRole="button"
                    accessibilityLabel="Toggle QA overlay"
                >
                    <Text style={[styles.buttonText, { color: colors.text.primary }]}>
                        {qaOverlay ? 'Hide QA Overlay' : 'Show QA Overlay'}
                    </Text>
                </TouchableOpacity>
            )}

            {__DEV__ && (
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: colors.background.secondary, borderColor: colors.border.default }
                    ]}
                    onPress={() => setIsPro(!isPro)}
                    accessibilityRole="button"
                    accessibilityLabel="Toggle Pro subscription"
                    accessibilityHint="Developer toggle for testing Pro features"
                >
                    <Text style={[styles.buttonText, { color: colors.text.primary }]}>
                        {isPro ? 'Disable Pro (Dev)' : 'Enable Pro (Dev)'}
                    </Text>
                </TouchableOpacity>
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
        fontFamily: 'Menlo',
    },
    badgeRow: {
        marginTop: 6,
        marginBottom: 4,
    },
    badgeText: {
        fontSize: 11,
        letterSpacing: 1,
        textTransform: 'uppercase',
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
    insightsBox: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        backgroundColor: 'rgba(110, 44, 243, 0.08)',
    },
    insightsTitle: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    insightsText: {
        fontSize: 12,
        marginBottom: 4,
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
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

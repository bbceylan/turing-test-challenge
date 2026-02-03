import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal } from 'react-native';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import { useStore } from '../store/useStore';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';
import { showInterstitialIfReady } from '../utils/ads';
import { loadRewarded, showRewardedIfReady } from '../utils/ads';
import { Share } from 'react-native';
import { Share2, ArrowLeft } from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    FadeIn
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { GameOverModal } from './GameOverModal';
import { useNavigation } from '@react-navigation/native';
import { getHintForCategory } from '../utils/hints';

// ... (AnimatedScanline is here, skipping)

const AnimatedScanline = () => {
    const translateY = useSharedValue(-100);

    useEffect(() => {
        translateY.value = withRepeat(
            withTiming(600, { duration: 3000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[styles.scanline, animatedStyle]} />
    );
};

// Helper to map model string to brand color
const getModelColor = (model: string, colors: any) => {
    const m = model.toLowerCase();
    if (m.includes('gpt')) return colors.brand.gpt;
    if (m.includes('claude')) return colors.brand.claude;
    if (m.includes('gemini')) return colors.brand.gemini;
    if (m.includes('llama')) return colors.brand.llama;
    if (m.includes('grok')) return colors.brand.grok;
    if (m.includes('mistral')) return colors.brand.mistral;
    return colors.text.accent; // Default fallback
};

interface QuizViewProps {
    category?: string;
    categories?: string[];
    onBack?: () => void;
    onNavigateToLeaderboard?: () => void;
    mode?: 'STANDARD' | 'DAILY' | 'GHOST' | 'PACK';
    roundLimit?: number;
    ghostTarget?: number;
}

export const QuizView: React.FC<QuizViewProps> = ({ category, categories, onBack, onNavigateToLeaderboard, mode = 'STANDARD', roundLimit, ghostTarget }) => {
    const {
        currentPair,
        options,
        revealed,
        selectedIndex,
        nextQuestion,
        submitGuess,
        gameOver,
        sessionStreak,
        sessionXp,
        streakBeforeGameOver,
        isNewRecord,
        resetGame,
        maxStreak,
        dailyStatus,
        loadingDaily,
        pendingShield,
        useShield,
        declineShield,
        roundsPlayed,
        ghostCorrect,
    } = useGameLogic(category, mode, categories, roundLimit);
    const { stats, isGuest, setGuest, isPro, adFreeUntil } = useStore();
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [hint, setHint] = useState<string>('');

    const cardOpacity = useSharedValue(0);
    const cardTranslateY = useSharedValue(50);

    useEffect(() => {
        if (currentPair) {
            cardOpacity.value = 0;
            cardTranslateY.value = 50;
            cardOpacity.value = withTiming(1, { duration: 500 });
            cardTranslateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.back(1.5)) });
            setHint(getHintForCategory(currentPair.category));
        }
    }, [currentPair]);

    const animatedCardStyle = useAnimatedStyle(() => ({
        opacity: cardOpacity.value,
        transform: [{ translateY: cardTranslateY.value }]
    }));

    const handleShare = async () => {
        if (!currentPair) return;
        try {
            const message = `I just took the Turing Test challenge! 🤖🎨\nCategory: ${currentPair.category}\nStreak: ${stats.currentStreak}\nCan you spot the human?`;
            await Share.share({
                message,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleGuess = (index: number) => {
        const result = submitGuess(index);
        if (!result) return;

        if (result.isCorrect) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            // Streak Haptic: Heavy impact every 5 streak
            if ((stats.currentStreak + 1) % 5 === 0) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const handleTryAgain = () => {
        resetGame();
    };

    const handleViewLeaderboard = () => {
        resetGame();
        if (onNavigateToLeaderboard) {
            onNavigateToLeaderboard();
        }
    };

    const handleGoPro = () => {
        // Navigate to Profile tab for purchase
        // @ts-ignore - navigation typing varies per app
        navigation.navigate('Profile');
    };

    const handleWatchAd = () => {
        const shown = showRewardedIfReady();
        if (!shown) {
            loadRewarded();
        }
    };

    if (!currentPair) return null;

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <GameOverModal
                visible={gameOver}
                sessionStreak={mode === 'GHOST' ? ghostCorrect : streakBeforeGameOver}
                maxStreak={mode === 'GHOST' ? stats.ghostBestScore : maxStreak}
                sessionXp={sessionXp}
                isNewRecord={mode === 'GHOST' ? ghostCorrect >= stats.ghostBestScore : (isNewRecord || streakBeforeGameOver === maxStreak)}
                onTryAgain={handleTryAgain}
                onViewLeaderboard={handleViewLeaderboard}
                showUpsell={!isPro && (!adFreeUntil || adFreeUntil <= Date.now()) && (mode === 'GHOST' ? ghostCorrect >= (stats.ghostBestScore || 0) : (isNewRecord || streakBeforeGameOver >= 7 || sessionXp >= 50))}
                onGoPro={handleGoPro}
                onWatchAd={handleWatchAd}
            />
            <AnimatedScanline />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {onBack && (
                            <TouchableOpacity onPress={onBack}>
                                <ArrowLeft color={colors.text.accent} size={24} />
                            </TouchableOpacity>
                        )}
                        <Text style={[styles.category, { color: colors.text.accent }]}>
                            {mode === 'DAILY' ? 'Daily Ritual' : currentPair.category}
                        </Text>
                    </View>
                    <Text style={[
                        styles.streak,
                        { color: colors.text.highlight },
                        stats.currentStreak >= 5 && NEON_SHADOWS.pink
                    ]}>
                        {mode === 'DAILY' ? `Daily Streak: ${stats.dailyStreak}` : `Streak: ${stats.currentStreak}`}
                    </Text>
                </View>
                <View style={styles.metaRow}>
                    <Text style={[styles.metaText, { color: colors.text.secondary }]}>Shields: {stats.streakShields}</Text>
                    {mode === 'GHOST' && roundLimit && (
                        <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                            Round {Math.min(roundsPlayed + 1, roundLimit)}/{roundLimit} • Ghost {ghostTarget ?? 0}
                        </Text>
                    )}
                </View>

                {mode === 'DAILY' && (
                    <View style={[styles.dailyBanner, { borderColor: colors.border.default, backgroundColor: colors.background.secondary }]}>
                        <Text style={[styles.dailyBannerText, { color: colors.text.primary }]}>
                            {dailyStatus?.completed ? 'Daily ritual complete. Come back tomorrow.' : 'One shot. Bonus XP on a correct guess.'}
                        </Text>
                    </View>
                )}

                {isGuest && (stats.currentStreak >= 3 || stats.totalXp >= 50) && (
                    <View style={[styles.authBanner, { borderColor: colors.border.default, backgroundColor: colors.background.secondary }]}>
                        <Text style={[styles.authBannerText, { color: colors.text.primary }]}>
                            Save your streak and sync across devices.
                        </Text>
                        <TouchableOpacity
                            style={[styles.authBannerButton, { borderColor: colors.text.highlight }]}
                            onPress={() => setGuest(false)}
                            accessibilityRole="button"
                            accessibilityLabel="Sign in to sync"
                        >
                            <Text style={[styles.authBannerButtonText, { color: colors.text.primary }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Text style={styles.prompt}>Which one is {currentPair.aiModel}?</Text>

                {options.map((option, index) => {
                    const isAi = !option.isHuman;
                    const isSelected = selectedIndex === index;

                    let cardStyle: any = [styles.card, { backgroundColor: colors.background.card, borderColor: colors.border.default }];

                    if (revealed) {
                        if (isAi) {
                            // IT WAS AI (Target) -> Always Green
                            cardStyle.push({
                                backgroundColor: colors.feedback.success,
                                borderColor: colors.border.success
                            });
                        } else if (isSelected) {
                            // IT WAS HUMAN (Wrong) -> Red if selected
                            cardStyle.push({
                                backgroundColor: colors.feedback.error,
                                borderColor: colors.border.error
                            });
                        } else {
                            // HUMAN (Unselected) -> Dim
                            cardStyle.push({ opacity: 0.5 });
                        }
                    } else if (isSelected) {
                        // Selected state before reveal (if any)
                        cardStyle.push(styles.selectedCard);
                    }

                    return (
                        <Animated.View key={index} style={animatedCardStyle}>
                            <TouchableOpacity
                                style={cardStyle}
                                onPress={() => !revealed && handleGuess(index)}
                                disabled={revealed || (mode === 'DAILY' && dailyStatus?.completed)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.text}>{option.text}</Text>
                                {revealed && (
                                    <View style={styles.labelContainer}>
                                        <Text style={[
                                            styles.labelText,
                                            { color: isAi ? colors.border.success : colors.border.error }
                                        ]}>
                                            {isAi ? `AI (${currentPair.aiModel}) 🤖` : "Human (Original) ✍️"}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </ScrollView>

            {revealed && (
                <Animated.View entering={FadeIn.duration(300)} style={styles.actions}>
                    <View style={styles.modelReveal}>
                        <Text style={styles.modelLabel}>Model used:</Text>
                        <Text style={[styles.modelName, { color: colors.text.primary }]}>{currentPair.aiModel}</Text>
                    </View>
                    {hint ? (
                        <Text style={[styles.hintText, { color: colors.text.secondary }]}>Hint: {hint}</Text>
                    ) : null}
                    {mode === 'GHOST' && roundLimit && (
                        <Text style={[styles.ghostHint, { color: colors.text.secondary }]}>
                            Ghost target: {ghostTarget ?? 0} correct • Your score: {ghostCorrect}
                        </Text>
                    )}

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.shareButton, { borderColor: colors.border.default }]}
                            onPress={handleShare}
                            accessibilityRole="button"
                            accessibilityLabel="Share Result"
                        >
                            <Share2 size={24} color={colors.text.primary} />
                        </TouchableOpacity>

                        {mode === 'DAILY' ? (
                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={onBack}
                                accessibilityRole="button"
                                accessibilityLabel="Back to Missions"
                                accessibilityHint="Return to category selection"
                            >
                                <Text style={[styles.nextButtonText, { color: colors.text.primary }]}>Back to Missions</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={nextQuestion}
                                accessibilityRole="button"
                                accessibilityLabel="Next Question"
                                accessibilityHint="Proceed to the next round"
                            >
                                <Text style={[styles.nextButtonText, { color: colors.text.primary }]}>Next Round</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>
            )}

            <Modal visible={pendingShield} transparent animationType="fade">
                <View style={styles.shieldOverlay}>
                    <View style={[styles.shieldModal, { backgroundColor: colors.background.primary }]}>
                        <Text style={styles.shieldTitle}>Shield Protocol</Text>
                        <Text style={styles.shieldSub}>Spend 1 shield to keep your streak alive?</Text>
                        <View style={styles.shieldButtons}>
                            <TouchableOpacity style={[styles.shieldButton, styles.shieldPrimary]} onPress={useShield}>
                                <Text style={styles.shieldPrimaryText}>Use Shield</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.shieldButton, styles.shieldSecondary]} onPress={declineShield}>
                                <Text style={styles.shieldSecondaryText}>End Run</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    scanline: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(0, 240, 255, 0.2)',
        zIndex: 10,
        shadowColor: COLORS.cyan,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    scrollContent: {
        flexGrow: 1, // Allow centering
        justifyContent: 'center', // Center vertically
        padding: 20,
        paddingBottom: 280, // Ensure space for bottom actions (sheet height)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40, // Increased spacing from content
        marginTop: 60, // Status bar clearance
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        marginTop: -20,
    },
    metaText: {
        fontSize: 12,
        letterSpacing: 0.4,
    },
    category: {
        color: COLORS.cyan,
        fontSize: 16,
        fontWeight: 'bold',
    },
    streak: {
        color: COLORS.pink,
        fontSize: 16,
        fontWeight: 'bold',
    },
    prompt: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    dailyBanner: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 18,
        alignSelf: 'center',
    },
    dailyBannerText: {
        fontSize: 12,
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    authBanner: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 18,
        alignSelf: 'center',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    authBannerText: {
        fontSize: 12,
        flex: 1,
        letterSpacing: 0.2,
    },
    authBannerButton: {
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 45, 171, 0.15)',
    },
    authBannerButtonText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    content: {
        gap: 30, // Increased gap
    },
    card: {
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
        borderRadius: 24, // Smoother corners
        padding: 24, // More breathing room
        borderWidth: 1,
        borderColor: COLORS.purple,
        minHeight: 160,
        justifyContent: 'center',
        marginBottom: 30, // Spacing between cards
    },
    selectedCard: {
        borderColor: COLORS.white,
        borderWidth: 2,
    },
    correctCard: {
        backgroundColor: 'rgba(0, 240, 255, 0.2)',
        borderColor: COLORS.cyan,
    },
    wrongCard: {
        backgroundColor: 'rgba(255, 45, 171, 0.2)',
        borderColor: COLORS.pink,
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: COLORS.purple,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
    },
    nextButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    actions: {
        padding: 20,
        paddingBottom: 110, // Added padding for TabBar clearance
        backgroundColor: COLORS.navy, // Solid background
        borderTopWidth: 1,
        borderTopColor: 'rgba(110, 44, 243, 0.2)',
        position: 'absolute', // Pin to bottom
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modelReveal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    modelLabel: {
        color: COLORS.gray,
        fontSize: 14,
        marginRight: 6,
    },
    modelName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ghostHint: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 0.2,
    },
    hintText: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 0.2,
    },
    labelContainer: {
        marginTop: 15,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 8,
        alignSelf: 'center',
    },
    labelText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    resultContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    shareButton: {
        backgroundColor: 'rgba(255, 45, 171, 0.2)',
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.pink,
    },
    shieldOverlay: {
        flex: 1,
        backgroundColor: 'rgba(10, 14, 41, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    shieldModal: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 18,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.neonCyan,
        ...NEON_SHADOWS.cyan,
    },
    shieldTitle: {
        color: COLORS.neonCyan,
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 1,
    },
    shieldSub: {
        color: COLORS.gray,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 14,
    },
    shieldButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    shieldButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    shieldPrimary: {
        backgroundColor: COLORS.neonCyan,
        borderColor: COLORS.neonCyan,
    },
    shieldPrimaryText: {
        color: COLORS.navy,
        fontWeight: '800',
        fontSize: 12,
    },
    shieldSecondary: {
        backgroundColor: 'transparent',
        borderColor: COLORS.neonPink,
    },
    shieldSecondaryText: {
        color: COLORS.neonPink,
        fontWeight: '700',
        fontSize: 12,
    }
});

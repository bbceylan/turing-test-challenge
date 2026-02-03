import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import { getRandomPair, TextPair } from '../utils/mockData';
import { useStore } from '../store/useStore';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';
import { showInterstitialIfReady } from '../utils/ads';
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
    onBack?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ category, onBack }) => {
    const {
        currentPair,
        options,
        revealed,
        selectedIndex,
        nextQuestion,
        submitGuess
    } = useGameLogic(category);
    const { stats } = useStore();
    const { colors } = useTheme();

    const cardOpacity = useSharedValue(0);
    const cardTranslateY = useSharedValue(50);

    useEffect(() => {
        if (currentPair) {
            cardOpacity.value = 0;
            cardTranslateY.value = 50;
            cardOpacity.value = withTiming(1, { duration: 500 });
            cardTranslateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.back(1.5)) });
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

    if (!currentPair) return null;

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <AnimatedScanline />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {onBack && (
                            <TouchableOpacity onPress={onBack}>
                                <ArrowLeft color={colors.text.accent} size={24} />
                            </TouchableOpacity>
                        )}
                        <Text style={[styles.category, { color: colors.text.accent }]}>{currentPair.category}</Text>
                    </View>
                    <Text style={[styles.streak, { color: colors.text.highlight }]}>Streak: {stats.currentStreak}</Text>
                </View>

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
                                disabled={revealed}
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

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.shareButton, { borderColor: colors.border.primary }]}
                            onPress={handleShare}
                            accessibilityRole="button"
                            accessibilityLabel="Share Result"
                        >
                            <Share2 size={24} color={colors.text.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={nextQuestion}
                            accessibilityRole="button"
                            accessibilityLabel="Next Question"
                            accessibilityHint="Proceed to the next round"
                        >
                            <Text style={[styles.nextButtonText, { color: colors.text.primary }]}>Next Round</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
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
    }
});

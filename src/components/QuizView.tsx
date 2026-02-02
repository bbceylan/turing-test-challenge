import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import { getRandomPair, TextPair } from '../utils/mockData';
import { useStore } from '../store/useStore';
import { useGameLogic } from '../hooks/useGameLogic';
import * as Haptics from 'expo-haptics';
import { showInterstitialIfReady } from '../utils/ads';
import { Share } from 'react-native';
import { Share2 } from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    FadeInDown
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

export const QuizView = () => {
    const {
        currentPair,
        options,
        revealed,
        selectedIndex,
        nextQuestion,
        submitGuess
    } = useGameLogic();
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.category, { color: colors.text.accent }]}>{currentPair.category}</Text>
                <Text style={[styles.streak, { color: colors.text.highlight }]}>Streak: {stats.currentStreak}</Text>

                {options.map((option, index) => (
                    <Animated.View key={index} style={animatedCardStyle}>
                        <TouchableOpacity
                            style={[
                                styles.card,
                                {
                                    backgroundColor: colors.background.card,
                                    borderColor: colors.border.default
                                },
                                selectedIndex === index && {
                                    borderColor: colors.border.active,
                                    borderWidth: 2
                                },
                                revealed && option.isHuman && {
                                    backgroundColor: colors.feedback.success,
                                    borderColor: colors.border.success
                                },
                                revealed && selectedIndex === index && !option.isHuman && {
                                    backgroundColor: colors.feedback.error,
                                    borderColor: colors.border.error
                                }
                            ]}
                            onPress={() => handleGuess(index)}
                            disabled={revealed}
                        >
                            <Text style={[styles.text, { color: colors.text.primary }]}>{option.text}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </ScrollView>

            {revealed && (
                <Animated.View
                    entering={FadeInDown.delay(200)}
                    style={[
                        styles.actions,
                        {
                            backgroundColor: colors.background.secondary,
                            borderTopColor: colors.background.scanline
                        }
                    ]}
                >
                    <View style={styles.modelReveal}>
                        <Text style={[styles.modelLabel, { color: colors.text.secondary }]}>AI Model:</Text>
                        <Text style={[styles.modelName, { color: colors.text.accent }]}>{currentPair.aiModel}</Text>
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[
                                styles.shareButton,
                                {
                                    backgroundColor: colors.background.secondary,
                                    borderColor: colors.border.error
                                }
                            ]}
                            onPress={handleShare}
                        >
                            <Share2 color={colors.text.primary} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.nextButton,
                                { backgroundColor: colors.border.default }
                            ]}
                            onPress={nextQuestion}
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
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 40,
    },
    category: {
        color: COLORS.cyan,
        fontSize: 16,
        fontWeight: 'bold',
    },
    streak: {
        color: COLORS.pink,
        fontSize: 16,
    },
    content: {
        gap: 20,
    },
    card: {
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.purple,
        minHeight: 150,
        justifyContent: 'center',
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
        backgroundColor: 'rgba(110, 44, 243, 0.05)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(110, 44, 243, 0.2)',
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
        color: COLORS.cyan,
        fontSize: 16,
        fontWeight: 'bold',
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

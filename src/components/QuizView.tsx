import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import { getRandomPair, TextPair } from '../utils/mockData';
import { useStore } from '../store/useStore';
import * as Haptics from 'expo-haptics';
import { showInterstitialIfReady } from '../utils/ads';
import { Share } from 'react-native';
import { Share2 } from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing
} from 'react-native-reanimated';

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
    const [currentPair, setCurrentPair] = useState<TextPair | null>(null);
    const [revealed, setRevealed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [options, setOptions] = useState<{ text: string, isHuman: boolean }[]>([]);

    const { addXp, stats } = useStore();

    useEffect(() => {
        nextQuestion();
    }, []);

    const nextQuestion = () => {
        const pair = getRandomPair();
        setCurrentPair(pair);
        const sortedOptions = [
            { text: pair.human, isHuman: true },
            { text: pair.ai, isHuman: false }
        ].sort(() => Math.random() - 0.5);
        setOptions(sortedOptions);
        setRevealed(false);
        setSelectedIndex(null);
    };

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
        if (revealed) return;
        setSelectedIndex(index);
        setRevealed(true);
        const isCorrect = options[index].isHuman;

        if (isCorrect) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }

        addXp(10, isCorrect);
        showInterstitialIfReady();
    };

    if (!currentPair) return null;

    return (
        <View style={styles.container}>
            <AnimatedScanline />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.category}>{currentPair.category}</Text>
                <Text style={styles.streak}>Streak: {stats.currentStreak}</Text>

                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.card,
                            selectedIndex === index && styles.selectedCard,
                            revealed && option.isHuman && styles.correctCard,
                            revealed && selectedIndex === index && !option.isHuman && styles.wrongCard
                        ]}
                        onPress={() => handleGuess(index)}
                        disabled={revealed}
                    >
                        <Text style={styles.text}>{option.text}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {revealed && (
                <View style={styles.actions}>
                    <View style={styles.modelReveal}>
                        <Text style={styles.modelLabel}>AI Model:</Text>
                        <Text style={styles.modelName}>{currentPair.aiModel}</Text>
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                            <Share2 color={COLORS.white} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                            <Text style={styles.nextButtonText}>Next Round</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

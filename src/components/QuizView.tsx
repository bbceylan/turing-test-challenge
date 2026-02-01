import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { COLORS } from '../constants/theme';
import { getRandomPair, TextPair } from '../utils/mockData';
import { useStore } from '../store/useStore';

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

    const handleGuess = (index: number) => {
        if (revealed) return;
        setSelectedIndex(index);
        setRevealed(true);
        const isCorrect = options[index].isHuman;
        addXp(10, isCorrect);
    };

    if (!currentPair) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.category}>{currentPair.category}</Text>
                <Text style={styles.streak}>Streak: {stats.currentStreak}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
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
                <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                    <Text style={styles.nextButtonText}>Next Round</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
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
        marginTop: 20,
        marginBottom: 40,
    },
    nextButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

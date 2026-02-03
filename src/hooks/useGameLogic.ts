import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomPair, TextPair } from '../utils/mockData';
import { useStore } from '../store/useStore';
import { showInterstitialIfReady } from '../utils/ads';
import { XP_VALUES } from '../constants/theme';

export const useGameLogic = (category?: string) => {
    const [currentPair, setCurrentPair] = useState<TextPair | null>(null);
    const [revealed, setRevealed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [options, setOptions] = useState<{ text: string, isHuman: boolean }[]>([]);
    const [gameOver, setGameOver] = useState(false);

    // Session tracking
    const [sessionStreak, setSessionStreak] = useState(0);
    const [sessionXp, setSessionXp] = useState(0);
    const streakBeforeGameOver = useRef(0);

    const { addXp, stats } = useStore();

    const nextQuestion = useCallback(() => {
        const pair = getRandomPair(category);
        setCurrentPair(pair);
        const sortedOptions = [
            { text: pair.human, isHuman: true },
            { text: pair.ai, isHuman: false }
        ].sort(() => Math.random() - 0.5);
        setOptions(sortedOptions);
        setRevealed(false);
        setSelectedIndex(null);
    }, [category]);

    useEffect(() => {
        nextQuestion();
    }, [nextQuestion]);

    const submitGuess = (index: number) => {
        if (revealed || gameOver) return null;

        setSelectedIndex(index);
        setRevealed(true);
        const isCorrect = !options[index].isHuman; // Win condition: Identify the AI

        if (isCorrect) {
            // Calculate XP earned for this answer
            const baseXp = XP_VALUES.CORRECT_GUESS;
            const streakBonus = Math.floor(sessionStreak / 5) * XP_VALUES.STREAK_BONUS_BASE;
            const earnedXp = baseXp + streakBonus;

            setSessionStreak(prev => prev + 1);
            setSessionXp(prev => prev + earnedXp);
        } else {
            // Store the streak before resetting for display in game over modal
            streakBeforeGameOver.current = sessionStreak;
            setGameOver(true);
        }

        addXp(10, isCorrect);
        showInterstitialIfReady();

        return { isCorrect };
    };

    const resetGame = useCallback(() => {
        setGameOver(false);
        setSessionStreak(0);
        setSessionXp(0);
        streakBeforeGameOver.current = 0;
        nextQuestion();
    }, [nextQuestion]);

    // Calculate if current session achieved a new record
    const isNewRecord = sessionStreak > 0 && stats.maxStreak === sessionStreak;

    return {
        currentPair,
        options,
        revealed,
        selectedIndex,
        nextQuestion,
        submitGuess,
        gameOver,
        sessionStreak,
        sessionXp,
        streakBeforeGameOver: streakBeforeGameOver.current,
        isNewRecord,
        resetGame,
        maxStreak: stats.maxStreak,
    };
};

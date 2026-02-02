import { useState, useEffect, useCallback } from 'react';
import { getRandomPair, TextPair } from '../utils/mockData';
import { useStore } from '../store/useStore';
import { showInterstitialIfReady } from '../utils/ads';

export const useGameLogic = () => {
    const [currentPair, setCurrentPair] = useState<TextPair | null>(null);
    const [revealed, setRevealed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [options, setOptions] = useState<{ text: string, isHuman: boolean }[]>([]);

    const { addXp } = useStore();

    const nextQuestion = useCallback(() => {
        const pair = getRandomPair();
        setCurrentPair(pair);
        const sortedOptions = [
            { text: pair.human, isHuman: true },
            { text: pair.ai, isHuman: false }
        ].sort(() => Math.random() - 0.5);
        setOptions(sortedOptions);
        setRevealed(false);
        setSelectedIndex(null);
    }, []);

    useEffect(() => {
        nextQuestion();
    }, [nextQuestion]);

    const submitGuess = (index: number) => {
        if (revealed) return null;

        setSelectedIndex(index);
        setRevealed(true);
        const isCorrect = options[index].isHuman;

        addXp(10, isCorrect);
        showInterstitialIfReady();

        return { isCorrect };
    };

    return {
        currentPair,
        options,
        revealed,
        selectedIndex,
        nextQuestion,
        submitGuess
    };
};

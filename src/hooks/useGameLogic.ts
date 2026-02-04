import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomPair, TextPair } from '../utils/mockData';
import { useStore } from '../store/useStore';
import { XP_VALUES } from '../constants/theme';
import { completeDailyChallenge, getDailyChallenge, getLocalDateKey, DailyStatus } from '../utils/daily';
import { getDb } from '../db/client';

export type GameMode = 'STANDARD' | 'DAILY' | 'GHOST' | 'PACK';

export const useGameLogic = (category?: string, mode: GameMode = 'STANDARD', categories?: string[], roundLimit?: number) => {
    const [currentPair, setCurrentPair] = useState<TextPair | null>(null);
    const [revealed, setRevealed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [options, setOptions] = useState<{ text: string, isHuman: boolean }[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [dailyStatus, setDailyStatus] = useState<DailyStatus | null>(null);
    const [loadingDaily, setLoadingDaily] = useState(false);
    const [pendingShield, setPendingShield] = useState(false);
    const [roundsPlayed, setRoundsPlayed] = useState(0);
    const [ghostCorrect, setGhostCorrect] = useState(0);

    // Session tracking
    const [sessionStreak, setSessionStreak] = useState(0);
    const [sessionXp, setSessionXp] = useState(0);
    const streakBeforeGameOver = useRef(0);

    const store = useStore() as any;
    const stats = store?.stats ?? {
        totalXp: 0,
        currentStreak: 0,
        maxStreak: 0,
        dailyStreak: 0,
        weeklyXp: 0,
        seasonXp: 0,
        streakShields: 0,
        ghostBestScore: 0,
    };
    const addXpWithOptions = store?.addXpWithOptions ?? ((xp: number, correct: boolean, _options?: any) => store?.addXp?.(xp, correct));
    const addDailyResult = store?.addDailyResult ?? (() => Promise.resolve());
    const consumeShield = store?.consumeShield ?? (() => Promise.resolve());
    const setGhostBestScore = store?.setGhostBestScore ?? (() => Promise.resolve());

    const buildOptions = (pair: TextPair) => [
        { text: pair.human, isHuman: true },
        { text: pair.ai, isHuman: false }
    ].sort(() => Math.random() - 0.5);

    const nextQuestion = useCallback(() => {
        if (mode === 'DAILY') return;
        const pair = getRandomPair(categories?.length ? categories : category);
        setCurrentPair(pair);
        setOptions(buildOptions(pair));
        setRevealed(false);
        setSelectedIndex(null);
    }, [category, mode, categories]);

    useEffect(() => {
        if (mode === 'DAILY') {
            const loadDaily = async () => {
                setLoadingDaily(true);
                try {
                    const dateKey = getLocalDateKey();
                    const { pair, status } = await getDailyChallenge(dateKey);
                    setCurrentPair(pair);
                    setOptions(buildOptions(pair));
                    setDailyStatus(status);
                    setRevealed(false);
                    setSelectedIndex(null);
                } finally {
                    setLoadingDaily(false);
                }
            };
            loadDaily();
        } else {
            nextQuestion();
        }
    }, [nextQuestion, mode]);

    const submitGuess = (index: number) => {
        if (revealed || gameOver) return null;
        if (mode === 'DAILY' && dailyStatus?.completed) return null;

        setSelectedIndex(index);
        setRevealed(true);
        const isCorrect = !options[index].isHuman; // Win condition: Identify the AI

        const shouldPromptShield = !isCorrect && mode !== 'DAILY' && stats.streakShields > 0;

        if (isCorrect) {
            // Calculate XP earned for this answer
            const baseXp = XP_VALUES.CORRECT_GUESS;
            const streakBonus = Math.floor(sessionStreak / 5) * XP_VALUES.STREAK_BONUS_BASE;
            const dailyBonus = mode === 'DAILY' ? XP_VALUES.DAILY_BONUS : 0;
            const earnedXp = baseXp + streakBonus + dailyBonus;

            setSessionStreak(prev => prev + 1);
            setSessionXp(prev => prev + earnedXp);
        } else {
            // Store the streak before resetting for display in game over modal
            streakBeforeGameOver.current = sessionStreak;
            if (shouldPromptShield) {
                setPendingShield(true);
            } else if (mode !== 'DAILY') {
                setGameOver(true);
            }
        }

        const baseXp = XP_VALUES.CORRECT_GUESS;
        const streakBonus = Math.floor(sessionStreak / 5) * XP_VALUES.STREAK_BONUS_BASE;
        const dailyBonus = mode === 'DAILY' ? XP_VALUES.DAILY_BONUS : 0;
        const earnedXp = baseXp + streakBonus + dailyBonus;
        if (isCorrect) {
            addXpWithOptions(earnedXp, true);
        } else if (!shouldPromptShield) {
            addXpWithOptions(0, false);
        }

        if (mode === 'DAILY') {
            const dateKey = getLocalDateKey();
            completeDailyChallenge(dateKey, isCorrect, isCorrect ? earnedXp : 0);
            addDailyResult(dateKey, isCorrect, isCorrect ? earnedXp : 0);
            setDailyStatus({
                dateKey,
                completed: true,
                correct: isCorrect,
                xpEarned: isCorrect ? earnedXp : 0,
            });
        }

        if (mode === 'GHOST') {
            const nextRounds = roundsPlayed + 1;
            const nextGhostCorrect = ghostCorrect + (isCorrect ? 1 : 0);
            setRoundsPlayed(nextRounds);
            if (isCorrect) setGhostCorrect(nextGhostCorrect);
            if (roundLimit && nextRounds >= roundLimit) {
                setGameOver(true);
                if (nextGhostCorrect > stats.ghostBestScore) {
                    setGhostBestScore(nextGhostCorrect);
                }
            }
        }

        const dbWrite = async () => {
            const db = await getDb();
            await db.runAsync(
                'INSERT INTO quiz_results (human_text, ai_text, category, chosen_human, is_correct, xp_earned) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    currentPair?.human ?? '',
                    currentPair?.ai ?? '',
                    currentPair?.category ?? '',
                    options[index].isHuman ? 1 : 0,
                    isCorrect ? 1 : 0,
                    isCorrect ? earnedXp : 0,
                ]
            );
        };
        dbWrite();

        return { isCorrect };
    };

    const resetGame = useCallback(() => {
        if (mode === 'DAILY') {
            setRevealed(false);
            setSelectedIndex(null);
            return;
        }
        if (mode === 'GHOST') {
            setRoundsPlayed(0);
            setGhostCorrect(0);
        }
        setGameOver(false);
        setSessionStreak(0);
        setSessionXp(0);
        streakBeforeGameOver.current = 0;
        nextQuestion();
    }, [nextQuestion, mode]);

    const useShield = async () => {
        if (stats.streakShields <= 0) return;
        await consumeShield();
        try {
            const db = await getDb();
            await db.runAsync('DELETE FROM quiz_results WHERE id = (SELECT id FROM quiz_results ORDER BY id DESC LIMIT 1)');
        } catch {
            // Ignore cleanup failure
        }
        await addXpWithOptions(0, false, { preserveStreak: true });
        setPendingShield(false);
    };

    const declineShield = async () => {
        await addXpWithOptions(0, false);
        setPendingShield(false);
        setGameOver(true);
    };

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
        dailyStatus,
        loadingDaily,
        pendingShield,
        useShield,
        declineShield,
        roundsPlayed,
        ghostCorrect,
    };
};

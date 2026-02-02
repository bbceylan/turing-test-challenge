import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuizView } from '../QuizView';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';
import * as Haptics from 'expo-haptics';

// Mock dependencies
jest.mock('../../hooks/useGameLogic');
jest.mock('../../store/useStore');
jest.mock('../../hooks/useTheme');
jest.mock('expo-haptics');
jest.mock('../../utils/ads', () => ({
    showInterstitialIfReady: jest.fn(),
}));

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

// Mock Icons
jest.mock('lucide-react-native', () => ({
    Share2: 'ShareIcon',
    User: 'UserIcon', // If used
    Bot: 'BotIcon', // If used
}));

describe('QuizView', () => {
    const mockUseGameLogic = useGameLogic as jest.Mock;
    const mockUseStore = useStore as unknown as jest.Mock;
    const mockUseTheme = useTheme as unknown as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockUseTheme.mockReturnValue({
            colors: {
                text: { primary: '#FFF', accent: '#0FF', secondary: '#888' },
                background: { card: '#111', secondary: '#222' },
                border: { default: '#333', success: '#0F0', error: '#F00' },
                feedback: { success: '#0F0', error: '#F00' },
            }
        });

        mockUseStore.mockReturnValue({
            stats: { currentStreak: 3 },
            addXp: jest.fn(),
        });
    });

    it('renders nothing if currentPair is null', () => {
        mockUseGameLogic.mockReturnValue({
            currentPair: null,
            options: [],
            revealed: false,
            selectedIndex: null,
            nextQuestion: jest.fn(),
            submitGuess: jest.fn(),
        });

        const { toJSON } = render(<QuizView />);
        expect(toJSON()).toBeNull();
    });

    it('renders options when currentPair is provided', () => {
        mockUseGameLogic.mockReturnValue({
            currentPair: { category: 'Poetry', human: 'Human', ai: 'AI' },
            options: [
                { text: 'Option A', isHuman: true },
                { text: 'Option B', isHuman: false },
            ],
            revealed: false,
            selectedIndex: null,
            nextQuestion: jest.fn(),
            submitGuess: jest.fn(),
        });

        const { getByText } = render(<QuizView />);
        expect(getByText('Poetry')).toBeTruthy();
        expect(getByText('Option A')).toBeTruthy();
        expect(getByText('Option B')).toBeTruthy();
    });

    it('handles guess submission and triggers haptics on success', () => {
        const mockSubmitGuess = jest.fn().mockReturnValue({ isCorrect: true });

        mockUseGameLogic.mockReturnValue({
            currentPair: { category: 'Poetry', human: 'Human', ai: 'AI' },
            options: [
                { text: 'Option A', isHuman: true },
                { text: 'Option B', isHuman: false },
            ],
            revealed: false,
            selectedIndex: null,
            nextQuestion: jest.fn(),
            submitGuess: mockSubmitGuess,
        });

        const { getByText } = render(<QuizView />);

        fireEvent.press(getByText('Option A'));

        expect(mockSubmitGuess).toHaveBeenCalledWith(0);
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
            Haptics.NotificationFeedbackType.Success
        );
    });

    it('triggers error haptic on incorrect guess', () => {
        const mockSubmitGuess = jest.fn().mockReturnValue({ isCorrect: false });

        mockUseGameLogic.mockReturnValue({
            currentPair: { category: 'Poetry', human: 'Human', ai: 'AI' },
            options: [
                { text: 'Option A', isHuman: true },
                { text: 'Option B', isHuman: false },
            ],
            revealed: false,
            selectedIndex: null,
            nextQuestion: jest.fn(),
            submitGuess: mockSubmitGuess,
        });

        const { getByText } = render(<QuizView />);

        fireEvent.press(getByText('Option B'));

        expect(mockSubmitGuess).toHaveBeenCalledWith(1);
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
            Haptics.NotificationFeedbackType.Error
        );
    });
});

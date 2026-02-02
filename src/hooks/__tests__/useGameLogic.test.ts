import { renderHook, act } from '@testing-library/react-native';
import { useGameLogic } from '../useGameLogic';
import { useStore } from '../../store/useStore';

// Mock dependencies
jest.mock('../../store/useStore', () => ({
    useStore: jest.fn(),
}));

jest.mock('../../utils/mockData', () => ({
    getRandomPair: jest.fn(() => ({
        human: 'Human Text',
        ai: 'AI Text',
        category: 'Test Category',
        aiModel: 'GPT-Test'
    })),
    TextPair: {} // Type mock if needed, but TS handles it
}));

jest.mock('../../utils/ads', () => ({
    showInterstitialIfReady: jest.fn(),
}));

describe('useGameLogic', () => {
    const mockAddXp = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useStore as unknown as jest.Mock).mockReturnValue({
            addXp: mockAddXp,
        });
    });

    it('initializes with a question', () => {
        const { result } = renderHook(() => useGameLogic());

        expect(result.current.currentPair).toBeDefined();
        expect(result.current.options).toHaveLength(2);
        expect(result.current.revealed).toBe(false);
    });

    it('handles correct guess', () => {
        const { result } = renderHook(() => useGameLogic());

        // Find the human option index
        const humanIndex = result.current.options.findIndex(opt => opt.isHuman);

        act(() => {
            const guessResult = result.current.submitGuess(humanIndex);
            expect(guessResult?.isCorrect).toBe(true);
        });

        expect(result.current.revealed).toBe(true);
        expect(result.current.selectedIndex).toBe(humanIndex);
        expect(mockAddXp).toHaveBeenCalledWith(10, true);
    });

    it('handles incorrect guess', () => {
        const { result } = renderHook(() => useGameLogic());

        // Find the AI option index
        const aiIndex = result.current.options.findIndex(opt => !opt.isHuman);

        act(() => {
            const guessResult = result.current.submitGuess(aiIndex);
            expect(guessResult?.isCorrect).toBe(false);
        });

        expect(result.current.revealed).toBe(true);
        expect(result.current.selectedIndex).toBe(aiIndex);
        expect(mockAddXp).toHaveBeenCalledWith(10, false);
    });

    it('loads next question', () => {
        const { result } = renderHook(() => useGameLogic());

        // Simulate a completed round
        const humanIndex = result.current.options.findIndex(opt => opt.isHuman);
        act(() => {
            result.current.submitGuess(humanIndex);
        });
        expect(result.current.revealed).toBe(true);

        // Move to next
        act(() => {
            result.current.nextQuestion();
        });

        expect(result.current.revealed).toBe(false);
        expect(result.current.selectedIndex).toBeNull();
        expect(result.current.currentPair).toBeDefined();
    });

    it('prevents multiple guesses', () => {
        const { result } = renderHook(() => useGameLogic());

        act(() => {
            result.current.submitGuess(0);
        });

        const firstRevealState = result.current.revealed;
        expect(firstRevealState).toBe(true);

        // Try guessing again
        let secondResult;
        act(() => {
            secondResult = result.current.submitGuess(1);
        });

        expect(secondResult).toBeNull();
        expect(mockAddXp).toHaveBeenCalledTimes(1); // Should only count first guess
    });
});

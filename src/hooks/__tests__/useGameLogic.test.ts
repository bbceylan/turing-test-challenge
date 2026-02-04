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

describe('useGameLogic', () => {
    const mockAddXpWithOptions = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockAddXpWithOptions.mockResolvedValue(undefined);
        (useStore as unknown as jest.Mock).mockReturnValue({
            addXpWithOptions: mockAddXpWithOptions,
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

        // Find the AI option index (correct)
        const aiIndex = result.current.options.findIndex(opt => !opt.isHuman);

        act(() => {
            const guessResult = result.current.submitGuess(aiIndex);
            expect(guessResult?.isCorrect).toBe(true);
        });

        expect(result.current.revealed).toBe(true);
        expect(result.current.selectedIndex).toBe(aiIndex);
        expect(mockAddXpWithOptions).toHaveBeenCalledWith(10, true);
    });

    it('handles incorrect guess', () => {
        const { result } = renderHook(() => useGameLogic());

        // Find the human option index (incorrect)
        const humanIndex = result.current.options.findIndex(opt => opt.isHuman);

        act(() => {
            const guessResult = result.current.submitGuess(humanIndex);
            expect(guessResult?.isCorrect).toBe(false);
        });

        expect(result.current.revealed).toBe(true);
        expect(result.current.selectedIndex).toBe(humanIndex);
        expect(mockAddXpWithOptions).toHaveBeenCalledWith(0, false);
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
        expect(mockAddXpWithOptions).toHaveBeenCalledTimes(1); // Should only count first guess
    });

    it('applies streak bonus on the 5th correct answer', () => {
        const { result } = renderHook(() => useGameLogic());

        for (let i = 0; i < 5; i++) {
            const aiIndex = result.current.options.findIndex(opt => !opt.isHuman);
            act(() => {
                result.current.submitGuess(aiIndex);
            });
            if (i < 4) {
                act(() => {
                    result.current.nextQuestion();
                });
            }
        }

        expect(mockAddXpWithOptions).toHaveBeenCalledTimes(5);
        expect(mockAddXpWithOptions).toHaveBeenNthCalledWith(1, 10, true);
        expect(mockAddXpWithOptions).toHaveBeenNthCalledWith(2, 10, true);
        expect(mockAddXpWithOptions).toHaveBeenNthCalledWith(3, 10, true);
        expect(mockAddXpWithOptions).toHaveBeenNthCalledWith(4, 10, true);
        expect(mockAddXpWithOptions).toHaveBeenNthCalledWith(5, 15, true);
    });
});

import { renderHook, act } from '@testing-library/react-native';
import { useGameLogic } from '../useGameLogic';
import { useStore } from '../../store/useStore';

// Mocks
jest.mock('../../store/useStore');
// Mock Data
jest.mock('../../utils/mockData', () => ({
    getRandomPair: jest.fn(() => ({
        id: '1',
        category: 'Test Category',
        human: 'Human Text',
        ai: 'AI Text',
        aiModel: 'TestBot'
    })),
    TextPair: {}
}));

describe('useGameLogic', () => {
    const mockAddXpWithOptions = jest.fn();
    const mockStats = { totalXp: 100, currentStreak: 5, maxStreak: 10 };

    beforeEach(() => {
        jest.clearAllMocks();
        mockAddXpWithOptions.mockResolvedValue(undefined);
        (useStore as unknown as jest.Mock).mockReturnValue({
            addXpWithOptions: mockAddXpWithOptions,
            stats: mockStats
        });
    });

    it('initializes with a question', () => {
        const { result } = renderHook(() => useGameLogic());

        expect(result.current.currentPair).toEqual({
            id: '1',
            category: 'Test Category',
            human: 'Human Text',
            ai: 'AI Text',
            aiModel: 'TestBot'
        });
        expect(result.current.options).toHaveLength(2);
        expect(result.current.revealed).toBe(false);
        expect(result.current.gameOver).toBe(false);
        expect(result.current.sessionStreak).toBe(0);
        expect(result.current.sessionXp).toBe(0);
    });

    it('handles correct guess and increments session streak', () => {
        const { result } = renderHook(() => useGameLogic());
        // Find AI option (correct guess = selecting AI)
        const aiIndex = result.current.options.findIndex(o => !o.isHuman);

        act(() => {
            result.current.submitGuess(aiIndex);
        });

        expect(result.current.revealed).toBe(true);
        expect(result.current.selectedIndex).toBe(aiIndex);
        expect(result.current.gameOver).toBe(false);
        expect(result.current.sessionStreak).toBe(1);
        expect(mockAddXpWithOptions).toHaveBeenCalledWith(10, true);
    });

    it('handles incorrect guess and triggers game over', () => {
        const { result } = renderHook(() => useGameLogic());
        // Find human option (incorrect guess = selecting human)
        const humanIndex = result.current.options.findIndex(o => o.isHuman);

        act(() => {
            result.current.submitGuess(humanIndex);
        });

        expect(result.current.revealed).toBe(true);
        expect(result.current.gameOver).toBe(true);
        expect(mockAddXpWithOptions).toHaveBeenCalledWith(0, false);
    });

    it('loads next question', () => {
        const { result } = renderHook(() => useGameLogic());
        // Find AI option for correct guess
        const aiIndex = result.current.options.findIndex(o => !o.isHuman);

        // First submit correct guess to reveal
        act(() => {
            result.current.submitGuess(aiIndex);
        });
        expect(result.current.revealed).toBe(true);

        // Next Question
        act(() => {
            result.current.nextQuestion();
        });

        expect(result.current.revealed).toBe(false);
        expect(result.current.selectedIndex).toBeNull();
    });

    it('resets game state correctly', () => {
        const { result } = renderHook(() => useGameLogic());
        const humanIndex = result.current.options.findIndex(o => o.isHuman);

        // Trigger game over
        act(() => {
            result.current.submitGuess(humanIndex);
        });
        expect(result.current.gameOver).toBe(true);

        // Reset game
        act(() => {
            result.current.resetGame();
        });

        expect(result.current.gameOver).toBe(false);
        expect(result.current.sessionStreak).toBe(0);
        expect(result.current.sessionXp).toBe(0);
        expect(result.current.revealed).toBe(false);
    });
});

import { renderHook, act } from '@testing-library/react-native';
import { useGameLogic } from '../useGameLogic';
import { useStore } from '../../store/useStore';
import { showInterstitialIfReady } from '../../utils/ads';

// Mocks
jest.mock('../../store/useStore');
jest.mock('../../utils/ads', () => ({
    showInterstitialIfReady: jest.fn(),
}));

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
    const mockAddXp = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useStore as unknown as jest.Mock).mockReturnValue({
            addXp: mockAddXp
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
    });

    it('handles correct guess', () => {
        const { result } = renderHook(() => useGameLogic());
        const humanIndex = result.current.options.findIndex(o => o.isHuman);

        act(() => {
            result.current.submitGuess(humanIndex);
        });

        expect(result.current.revealed).toBe(true);
        expect(result.current.selectedIndex).toBe(humanIndex);
        expect(mockAddXp).toHaveBeenCalledWith(10, true);
        expect(showInterstitialIfReady).toHaveBeenCalled();
    });

    it('handles incorrect guess', () => {
        const { result } = renderHook(() => useGameLogic());
        const aiIndex = result.current.options.findIndex(o => !o.isHuman);

        act(() => {
            result.current.submitGuess(aiIndex);
        });

        expect(result.current.revealed).toBe(true);
        expect(mockAddXp).toHaveBeenCalledWith(10, false);
        // Note: verify if false means 0 XP or penalty. 
        // Looking at logic: addXp(10, isCorrect). If isCorrect false, logic inside store decides.
    });

    it('loads next question', () => {
        const { result } = renderHook(() => useGameLogic());

        // First submit guess to reveal
        act(() => {
            result.current.submitGuess(0);
        });
        expect(result.current.revealed).toBe(true);

        // Next Question
        act(() => {
            result.current.nextQuestion();
        });

        expect(result.current.revealed).toBe(false);
        expect(result.current.selectedIndex).toBeNull();
    });
});

import { renderHook, act } from '@testing-library/react-native';
import { useStore } from '../useStore';
import { getDb } from '../../db/client';

// Mock Dependencies
jest.mock('../../db/client', () => ({
    getDb: jest.fn(),
}));

jest.mock('../../utils/supabase', () => ({
    supabase: {
        auth: { getSession: jest.fn() },
        from: jest.fn(() => ({ upsert: jest.fn() }))
    }
}));

jest.mock('../../utils/widget', () => ({
    updateWidgetData: jest.fn()
}));

jest.mock('expo-constants', () => ({
    expoConfig: { extra: {} }
}));

describe('useStore Logic', () => {
    const mockRunAsync = jest.fn();
    const mockGetFirstAsync = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (getDb as jest.Mock).mockResolvedValue({
            runAsync: mockRunAsync,
            getFirstAsync: mockGetFirstAsync,
        });

        // Reset store state
        useStore.setState({
            stats: { totalXp: 0, currentStreak: 0, maxStreak: 0 },
            session: null,
            isGuest: true
        });
    });

    it('adds XP and increments streak on correct answer', async () => {
        const { result } = renderHook(() => useStore());

        await act(async () => {
            await result.current.addXp(10, true);
        });

        expect(result.current.stats.totalXp).toBe(10);
        expect(result.current.stats.currentStreak).toBe(1);
        expect(result.current.stats.maxStreak).toBe(1);

        // specific DB call check could go here if needed
        expect(mockRunAsync).toHaveBeenCalled();
    });

    it('resets streak on incorrect answer', async () => {
        const { result } = renderHook(() => useStore());

        // First get some streak
        // First get some streak
        act(() => {
            useStore.setState({
                stats: { totalXp: 50, currentStreak: 5, maxStreak: 5 }
            });
        });

        await act(async () => {
            await result.current.addXp(10, false);
        });

        expect(result.current.stats.totalXp).toBe(50); // No XP gain
        expect(result.current.stats.currentStreak).toBe(0); // Reset
        expect(result.current.stats.maxStreak).toBe(5); // Max preserved
    });

    it('updates max streak only if current exceeds it', async () => {
        const { result } = renderHook(() => useStore());

        act(() => {
            useStore.setState({
                stats: { totalXp: 100, currentStreak: 9, maxStreak: 10 }
            });
        });

        await act(async () => {
            await result.current.addXp(10, true);
        });

        expect(result.current.stats.currentStreak).toBe(10);
        expect(result.current.stats.maxStreak).toBe(10); // Equal, no change

        await act(async () => {
            await result.current.addXp(10, true);
        });

        expect(result.current.stats.currentStreak).toBe(11);
        expect(result.current.stats.maxStreak).toBe(11); // New Record
    });
});

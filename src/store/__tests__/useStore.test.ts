import { useStore } from '../useStore';
import { getDb } from '../../db/client';

// Mock getDb manually since it's used directly
jest.mock('../../db/client', () => ({
    getDb: jest.fn(() => Promise.resolve({
        runAsync: jest.fn(),
        getFirstAsync: jest.fn(),
    })),
}));

describe('useStore Logic', () => {
    beforeEach(() => {
        useStore.setState({
            stats: { totalXp: 0, currentStreak: 0, maxStreak: 0 },
            isGuest: false,
            session: null,
        });
        jest.clearAllMocks();
    });

    it('updates Guest state correctly', () => {
        const { setGuest } = useStore.getState();
        setGuest(true);
        expect(useStore.getState().isGuest).toBe(true);
    });

    it('increments XP and Streak on correct guess', async () => {
        const { addXp } = useStore.getState();
        await addXp(10, true);

        const { stats } = useStore.getState();
        expect(stats.totalXp).toBe(10);
        expect(stats.currentStreak).toBe(1);
        expect(stats.maxStreak).toBe(1);
    });

    it('resets Streak on incorrect guess', async () => {
        // Setup initial state
        useStore.setState({
            stats: { totalXp: 50, currentStreak: 5, maxStreak: 5 }
        });

        const { addXp } = useStore.getState();
        await addXp(10, false);

        const { stats } = useStore.getState();
        expect(stats.totalXp).toBe(50); // XP unchanged
        expect(stats.currentStreak).toBe(0); // Streak reset
        expect(stats.maxStreak).toBe(5); // Max preserved
    });
});

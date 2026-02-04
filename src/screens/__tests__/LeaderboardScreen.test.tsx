import React from 'react';
import { render, act } from '@testing-library/react-native';
import { LeaderboardScreen } from '../LeaderboardScreen';
import { useStore } from '../../store/useStore';
import { getDb } from '../../db/client';

jest.mock('../../store/useStore');
jest.mock('../../db/client', () => ({
    getDb: jest.fn(),
}));

describe('LeaderboardScreen (Local)', () => {
    const mockUseStore = useStore as unknown as jest.Mock;
    const mockGetDb = getDb as unknown as jest.Mock;

    beforeEach(() => {
        mockUseStore.mockReturnValue({
            stats: { totalXp: 1200, maxStreak: 7 },
            friendCode: 'GUEST-ABC123',
            username: 'Neo',
        });
    });

    it('renders local stats summary', async () => {
        mockGetDb.mockResolvedValue({
            getFirstAsync: jest.fn(() => Promise.resolve({ total: 10, correct: 7, ai_choice: 5 })),
            getAllAsync: jest.fn(() => Promise.resolve([])),
        });

        const { getByText } = render(<LeaderboardScreen />);
        await act(async () => {});

        expect(getByText('Local Leaderboard')).toBeTruthy();
        expect(getByText('Total XP')).toBeTruthy();
        expect(getByText('Best Streak')).toBeTruthy();
    });
});

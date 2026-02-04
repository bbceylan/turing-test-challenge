import React from 'react';
import { render, act } from '@testing-library/react-native';
import { ProfileScreen } from '../ProfileScreen';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';

// Mock dependencies
jest.mock('../../store/useStore');
jest.mock('../../hooks/useTheme');

// Mock Lucide Icons to avoid SVG issues
jest.mock('lucide-react-native', () => ({
    User: 'UserIcon',
    Edit3: 'EditIcon',
    Check: 'CheckIcon',
    X: 'XIcon',
}));

describe('ProfileScreen', () => {
    const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
    const mockUseStore = useStore as unknown as jest.Mock;
    const mockUseTheme = useTheme as unknown as jest.Mock;

    const mockStats = { currentStreak: 5, maxStreak: 10, totalXp: 500 };

    beforeEach(() => {
        mockUseTheme.mockReturnValue({
            colors: {
                background: { primary: '#000000', card: '#111111', secondary: '#222222' },
                text: { accent: '#00FFFF', primary: '#FFFFFF', secondary: '#888888', highlight: '#FF00FF' },
                border: { default: '#333333', success: '#00FF00', active: '#0000FF' },
                feedback: { error: '#FF0000' }
            }
        });
    });

    it('renders offline profile info', async () => {
        mockUseStore.mockReturnValue({
            stats: mockStats,
            isPro: false,
            setIsPro: jest.fn(),
            friendCode: 'GUEST-ABC123',
            username: null,
            setUsername: jest.fn(),
            qaOverlay: false,
            setQaOverlay: jest.fn(),
        });

        const { getByText } = render(<ProfileScreen />);
        await act(async () => {
            await flushPromises();
        });

        expect(getByText('Agent Profile')).toBeTruthy();
        expect(getByText('Offline Agent')).toBeTruthy();
        expect(getByText('Offline Mode')).toBeTruthy();
    });

    it('hides "Unlock Pro" button if user is Pro', async () => {
        mockUseStore.mockReturnValue({
            stats: mockStats,
            isPro: true,
            setIsPro: jest.fn(),
            friendCode: 'GUEST-ABC123',
            username: 'Neo',
            setUsername: jest.fn(),
            qaOverlay: false,
            setQaOverlay: jest.fn(),
        });

        const { queryByText } = render(<ProfileScreen />);
        await act(async () => {
            await flushPromises();
        });

        expect(queryByText('Unlock Pro')).toBeNull();
    });

    it('shows "Unlock Pro" button if user is NOT Pro', async () => {
        mockUseStore.mockReturnValue({
            stats: mockStats,
            isPro: false,
            setIsPro: jest.fn(),
            friendCode: 'GUEST-ABC123',
            username: 'Neo',
            setUsername: jest.fn(),
            qaOverlay: false,
            setQaOverlay: jest.fn(),
        });

        const { getByText } = render(<ProfileScreen />);
        await act(async () => {
            await flushPromises();
        });
        expect(getByText('Unlock Pro')).toBeTruthy();
    });
});

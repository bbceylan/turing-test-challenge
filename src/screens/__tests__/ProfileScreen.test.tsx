import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { ProfileScreen } from '../ProfileScreen';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';
import { supabase } from '../../utils/supabase';

// Mock dependencies
jest.mock('../../store/useStore');
jest.mock('../../hooks/useTheme');
jest.mock('../../utils/supabase', () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn(() => ({
                eq: jest.fn(() => ({
                    single: jest.fn(() => Promise.resolve({ data: { username: 'Test User' }, error: null }))
                }))
            })),
            upsert: jest.fn(() => Promise.resolve({ error: null })),
        })),
        auth: {
            signOut: jest.fn(),
        }
    }
}));

// Mock Lucide Icons to avoid SVG issues
jest.mock('lucide-react-native', () => ({
    User: 'UserIcon',
    Edit3: 'EditIcon',
    Check: 'CheckIcon',
    X: 'XIcon',
    Share2: 'ShareIcon',
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

    it('renders correctly in Guest Mode', async () => {
        mockUseStore.mockReturnValue({
            isGuest: true,
            stats: mockStats,
            session: null,
            user: null,
            setGuest: jest.fn(),
            setSession: jest.fn(),
            isPro: false,
            rewardedReady: true,
            forceMockAds: false,
            setForceMockAds: jest.fn(),
        });

        const { getByText } = render(<ProfileScreen />);
        await act(async () => {
            await flushPromises();
        });

        expect(getByText('Agent Profile')).toBeTruthy();
        expect(getByText('Guest Agent')).toBeTruthy();
        expect(getByText('Offline Mode')).toBeTruthy();
        expect(getByText('Sign Up / Sign In')).toBeTruthy();
    });

    it('renders correctly in User Mode and fetches profile', async () => {
        mockUseStore.mockReturnValue({
            isGuest: false,
            stats: mockStats,
            session: { user: { email: 'test@example.com' } },
            user: { id: 'user-123' },
            isPro: true,
            setGuest: jest.fn(),
            setSession: jest.fn(),
            rewardedReady: true,
            forceMockAds: false,
            setForceMockAds: jest.fn(),
        });

        const { getByText } = render(<ProfileScreen />);
        await act(async () => {
            await flushPromises();
        });

        expect(getByText('Agent Profile')).toBeTruthy();
        expect(getByText('test@example.com')).toBeTruthy();

        await waitFor(() => {
            expect(getByText('Test User')).toBeTruthy();
        });
    });

    it('hides "Go Ad-Free" button if user is Pro', async () => {
        mockUseStore.mockReturnValue({
            isGuest: false,
            stats: mockStats,
            session: { user: { email: 'test@example.com' } },
            user: { id: 'user-123' },
            isPro: true, // Pro user
            setGuest: jest.fn(),
            setSession: jest.fn(),
            rewardedReady: true,
            forceMockAds: false,
            setForceMockAds: jest.fn(),
        });

        const { queryByText } = render(<ProfileScreen />);
        await act(async () => {
            await flushPromises();
        });
        expect(queryByText('Go Ad-Free')).toBeNull();
    });

    it('shows "Go Ad-Free" button if user is NOT Pro', async () => {
        mockUseStore.mockReturnValue({
            isGuest: false,
            stats: mockStats,
            session: { user: { email: 'test@example.com' } },
            user: { id: 'user-123' },
            isPro: false, // Free user
            setGuest: jest.fn(),
            setSession: jest.fn(),
            rewardedReady: true,
            forceMockAds: false,
            setForceMockAds: jest.fn(),
        });

        const { getByText } = render(<ProfileScreen />);
        await act(async () => {
            await flushPromises();
        });
        expect(getByText('Go Ad-Free')).toBeTruthy();
    });
});

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';
import { useStore } from '../src/store/useStore';
import { initDb } from '../src/db/client';

// Mocks
jest.mock('expo-status-bar', () => ({ StatusBar: () => 'StatusBar' }));
jest.mock('expo-blur', () => ({ BlurView: 'BlurView' }));
jest.mock('expo-haptics', () => ({}));
jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual('@react-navigation/native'),
        NavigationContainer: ({ children }: any) => <>{children}</>,
    };
});
jest.mock('@react-navigation/bottom-tabs', () => ({
    createBottomTabNavigator: () => ({
        Navigator: ({ children }: any) => <>{children}</>,
        Screen: () => <></>,
    }),
}));

// Mock Screens
jest.mock('../src/screens/PlayScreen', () => ({ PlayScreen: () => 'PlayScreen' }));
jest.mock('../src/screens/LeaderboardScreen', () => ({ LeaderboardScreen: () => 'LeaderboardScreen' }));
jest.mock('../src/screens/MilestoneScreen', () => ({ MilestoneScreen: () => 'MilestoneScreen' }));
jest.mock('../src/screens/ProfileScreen', () => ({ ProfileScreen: () => 'ProfileScreen' }));
jest.mock('../src/screens/AuthScreen', () => ({ AuthScreen: () => 'AuthScreen' }));

jest.mock('../src/db/client', () => ({
    initDb: jest.fn(),
}));

jest.mock('../src/utils/supabase', () => ({
    supabase: {
        auth: {
            getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
        }
    }
}));

jest.mock('../src/store/useStore');

// Explicitly mock utilities to avoid native module requirements
jest.mock('../src/utils/notifications', () => ({
    registerForPushNotificationsAsync: jest.fn(),
    scheduleDailyReminder: jest.fn(),
}));
jest.mock('../src/utils/ads', () => ({
    loadInterstitial: jest.fn(),
    loadRewarded: jest.fn(),
}));

describe('App Smoke Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useStore as unknown as jest.Mock).mockReturnValue({
            loadStats: jest.fn(),
            isLoading: false,
            session: { user: { id: '123' } },
            setSession: jest.fn(), // Ensure this is defined
            isGuest: false,
            // Add any other methods called in App.tsx setup if needed, but setSession was the one failing
        });
        (useStore as any).getState = jest.fn().mockReturnValue({ isGuest: false });
        (useStore as any).setState = jest.fn();
    });

    it('renders without crashing', async () => {
        const { toJSON } = render(<App />);

        await waitFor(() => {
            expect(initDb).toHaveBeenCalled();
        });

        expect(toJSON()).toBeTruthy();
    });

    it('shows loading state initially', () => {
        (useStore as unknown as jest.Mock).mockReturnValue({
            loadStats: jest.fn(),
            isLoading: true, // Force loading
            setSession: jest.fn(),
        });

        const { getByText } = render(<App />);
        expect(getByText('Loading...')).toBeTruthy();
    });
});

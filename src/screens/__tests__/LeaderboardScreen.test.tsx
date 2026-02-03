import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { LeaderboardScreen } from '../LeaderboardScreen';
import { useStore } from '../../store/useStore';
import { supabase } from '../../utils/supabase';

describe('LeaderboardScreen', () => {
    const mockData = [{ id: '1', username: 'Test Agent', total_xp: 1000 }];
    const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
    const createMockChain = () => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        in: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    beforeEach(() => {
        useStore.setState({ isGuest: false });
        jest.clearAllMocks();
        // Default mock for all tests
        (supabase.from as jest.Mock).mockReturnValue(createMockChain());
    });

    it('renders guest banner when in guest mode', async () => {
        useStore.setState({ isGuest: true });

        const { getByText } = render(<LeaderboardScreen />);
        await act(async () => {
            await flushPromises();
        });

        await waitFor(() => {
            expect(getByText('Guest Mode Active')).toBeTruthy();
        });
    });

    it('renders tabs and fetches data in normal mode', async () => {
        const { getByText } = render(<LeaderboardScreen />);
        await act(async () => {
            await flushPromises();
        });

        // Verify static UI
        expect(getByText('Rankings')).toBeTruthy();
        expect(getByText('Global')).toBeTruthy();
        expect(getByText('Weekly')).toBeTruthy();

        // Wait for data to load and render
        await waitFor(() => {
            expect(supabase.from).toHaveBeenCalledWith('profiles');
        });

        await waitFor(() => {
            expect(getByText('#1')).toBeTruthy();
            expect(getByText('Test Agent')).toBeTruthy();
        });
    });

    it('switches tabs and refetches data', async () => {
        const { getByText } = render(<LeaderboardScreen />);
        await act(async () => {
            await flushPromises();
        });

        // Wait for initial load
        await waitFor(() => {
            expect(getByText('#1')).toBeTruthy();
        });

        // Switch to Weekly tab
        await act(async () => {
            fireEvent.press(getByText('Weekly'));
        });

        // Verify the tab switch triggers a new fetch
        await waitFor(() => {
            expect((supabase.from as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(2);
        });
    });
});

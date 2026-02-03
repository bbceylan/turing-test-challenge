import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthScreen } from '../AuthScreen';
import { useStore } from '../../store/useStore';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('AuthScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useStore.setState({ isGuest: false, isLoading: false });
    });

    it('renders correctly', () => {
        const { getByText } = render(<AuthScreen />);
        expect(getByText('Initialize Agent')).toBeTruthy();
        expect(getByText('Continue as Guest')).toBeTruthy();
        expect(getByText('Sign in with Apple')).toBeTruthy();
        expect(getByText('Sign in with Google')).toBeTruthy();
    });

    it('sets Guest mode when button pressed', () => {
        const { getByText } = render(<AuthScreen />);
        const guestBtn = getByText('Continue as Guest');

        fireEvent.press(guestBtn);

        expect(useStore.getState().isGuest).toBe(true);
    });
});

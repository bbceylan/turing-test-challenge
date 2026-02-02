import { renderHook } from '@testing-library/react-native';
import { useTheme } from '../useTheme';
import { SEMANTIC_COLORS, COLORS } from '../../constants/theme';

describe('useTheme', () => {
    it('should return semantic colors', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.colors).toEqual(SEMANTIC_COLORS);
    });

    it('should return raw palette for fallback', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.palette).toEqual(COLORS);
    });

    it('should return consistent spacing and border radius', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.spacing.m).toBe(16);
        expect(result.current.borderRadius.round).toBe(9999);
    });
});

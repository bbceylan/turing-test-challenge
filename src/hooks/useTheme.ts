import { SEMANTIC_COLORS, COLORS } from '../constants/theme';

export const useTheme = () => {
    // In the future, this can hook into a ThemeContext for light/dark mode switching
    return {
        colors: SEMANTIC_COLORS,
        palette: COLORS, // fallback access if needed
        spacing: {
            s: 8,
            m: 16,
            l: 24,
            xl: 32,
        },
        borderRadius: {
            s: 8,
            m: 12,
            l: 16,
            round: 9999,
        }
    };
};

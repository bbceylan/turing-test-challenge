export const COLORS = {
    navy: '#0A0E29',
    purple: '#6E2CF3',
    pink: '#FF2DAB',
    cyan: '#00F0FF',
    white: '#FFFFFF',
    gray: '#8E8E93',
};

export const SEMANTIC_COLORS = {
    background: {
        primary: COLORS.navy,
        secondary: 'rgba(110, 44, 243, 0.05)',
        card: 'rgba(110, 44, 243, 0.1)',
        scanline: 'rgba(0, 240, 255, 0.2)',
    },
    text: {
        primary: COLORS.white,
        secondary: COLORS.gray,
        accent: COLORS.cyan,
        highlight: COLORS.pink,
    },
    border: {
        default: COLORS.purple,
        active: COLORS.white,
        success: COLORS.cyan,
        error: COLORS.pink,
    },
    feedback: {
        success: 'rgba(0, 240, 255, 0.2)',
        error: 'rgba(255, 45, 171, 0.2)',
    }
};

export const CATEGORIES = [
    'Philosophy',
    'Poetry',
    'Technical',
    'Casual',
    'Creative Writing',
];

export const XP_VALUES = {
    CORRECT_GUESS: 10,
    STREAK_BONUS_BASE: 5,
};

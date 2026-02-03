export const COLORS = {
    // Dark base
    navy: '#0A0E29',
    deepPurple: '#1A0A2E',

    // Neon accents
    purple: '#6E2CF3',
    neonPurple: '#6E2CF3',
    pink: '#FF2DAB',
    neonPink: '#FF2DAB',
    cyan: '#00F0FF',
    neonCyan: '#00F0FF',
    hotPink: '#FF1493',

    // Miami sunset
    sunsetOrange: '#FF6B35',
    sunsetPink: '#FF3864',

    // Subtle glows for borders/shadows
    glowPink: 'rgba(255, 45, 171, 0.4)',
    glowCyan: 'rgba(0, 240, 255, 0.4)',
    glowPurple: 'rgba(110, 44, 243, 0.4)',

    // Text
    white: '#FFFFFF',
    gray: '#8E8E93',
};

// Neon shadow styles for glow effects
export const NEON_SHADOWS = {
    pink: {
        shadowColor: '#FF2DAB',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    cyan: {
        shadowColor: '#00F0FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    purple: {
        shadowColor: '#6E2CF3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    subtle: {
        shadowColor: '#6E2CF3',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
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
    },
    brand: {
        gpt: '#10A37F', // OpenAI Green
        claude: '#D97757', // Anthropic Orange
        gemini: '#1B6EF3', // Google Blue
        llama: '#044CD0', // Meta Blue
        grok: '#FFFFFF', // xAI White
        mistral: '#F39F49', // Mistral Yellow/Orange
    }
};

export const CATEGORIES = [
    'Literature',
    'Philosophy',
    'Religious',
    'Fantasy',
    'Horror',
];

export const XP_VALUES = {
    CORRECT_GUESS: 10,
    STREAK_BONUS_BASE: 5,
};

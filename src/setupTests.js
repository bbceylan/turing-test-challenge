import '@testing-library/react-native/matchers';

// Mock Lucide Icons
jest.mock('lucide-react-native', () => ({
    Globe: 'Globe',
    Calendar: 'Calendar',
    Lock: 'Lock',
    Flame: 'Flame',
    Crown: 'Crown',
    Trophy: 'Trophy',
    Zap: 'Zap',
    RotateCcw: 'RotateCcw',
    Award: 'Award',
    Share2: 'Share2',
    ArrowLeft: 'ArrowLeft',
    User: 'User',
    Edit3: 'Edit3',
    Check: 'Check',
    X: 'X',
    Gamepad2: 'Gamepad2',
    Target: 'Target',
    Users: 'Users',
    BookOpen: 'BookOpen',
    Brain: 'Brain',
    FlaskConical: 'FlaskConical',
    Ghost: 'Ghost',
    Monitor: 'Monitor',
    Scroll: 'Scroll',
    Sparkles: 'Sparkles',
}));

// Mock Supabase
jest.mock('./utils/supabase', () => ({
    supabase: {
        auth: {
            getSession: jest.fn(() => Promise.resolve({ data: { session: null }, error: null })),
            signInWithPassword: jest.fn(),
            signUp: jest.fn(),
            signOut: jest.fn(),
        },
        from: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            insert: jest.fn().mockReturnThis(),
            update: jest.fn().mockReturnThis(),
            upsert: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockReturnThis(),
            order: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
        })),
    },
}));

// Mock Expo SQLite
jest.mock('expo-sqlite', () => ({
    openDatabaseAsync: jest.fn(() => Promise.resolve({
        runAsync: jest.fn(),
        getFirstAsync: jest.fn(),
        getAllAsync: jest.fn(() => Promise.resolve([])),
        execAsync: jest.fn(),
        withTransactionAsync: jest.fn((cb) => cb()),
    })),
}));

// Mock Ads
jest.mock('react-native-google-mobile-ads', () => ({
    BannerAd: 'BannerAd',
    BannerAdSize: {},
    TestIds: { BANNER: 'test-banner', INTERSTITIAL: 'test-interstitial' },
    InterstitialAd: {
        createForAdRequest: jest.fn(() => ({
            addAdEventListener: jest.fn(),
            load: jest.fn(),
            show: jest.fn(),
        })),
    },
}));

// Mock RevenueCat
jest.mock('react-native-purchases', () => ({
    default: {
        configure: jest.fn(),
        getOfferings: jest.fn(),
        purchasePackage: jest.fn(),
        restorePurchases: jest.fn(),
    },
}));

// Mock Expo Constants
jest.mock('expo-constants', () => ({
    default: {
        manifest: { extra: {} },
        appOwnership: 'expo',
    },
}));

// Mock Expo FileSystem
jest.mock('expo-file-system', () => ({
    documentDirectory: 'file:///data/',
    writeAsStringAsync: jest.fn(),
    readAsStringAsync: jest.fn(),
    getInfoAsync: jest.fn(),
}));

jest.mock('expo-file-system/legacy', () => ({
    documentDirectory: 'file:///data/',
    writeAsStringAsync: jest.fn(),
    readAsStringAsync: jest.fn(),
    getInfoAsync: jest.fn(),
}));

jest.mock('expo-web-browser', () => ({
    maybeCompleteAuthSession: jest.fn(),
    openAuthSessionAsync: jest.fn(() => Promise.resolve({ type: 'dismiss' })),
}));

jest.mock('expo-auth-session', () => ({
    makeRedirectUri: jest.fn(() => 'app://redirect'),
}));

// Mock Navigation
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
        }),
    };
});

// Mock Expo Haptics
jest.mock('expo-haptics', () => ({
    notificationAsync: jest.fn(),
    impactAsync: jest.fn(),
    selectionAsync: jest.fn(),
    NotificationFeedbackType: {
        Success: 'Success',
        Warning: 'Warning',
        Error: 'Error',
    },
    ImpactFeedbackStyle: {
        Light: 'Light',
        Medium: 'Medium',
        Heavy: 'Heavy',
    },
}));

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

import '@testing-library/react-native/matchers';

// Mock Lucide Icons
jest.mock('lucide-react-native', () => ({
    Globe: 'Globe',
    Calendar: 'Calendar',
    Lock: 'Lock',
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
        getAllAsync: jest.fn(),
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

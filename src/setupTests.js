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
    BarChart3: 'BarChart3',
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
// Mock IAP
jest.mock('react-native-iap', () => ({
    initConnection: jest.fn(() => Promise.resolve(true)),
    endConnection: jest.fn(() => Promise.resolve(true)),
    getProducts: jest.fn(() => Promise.resolve([])),
    requestPurchase: jest.fn(() => Promise.resolve(null)),
    finishTransaction: jest.fn(() => Promise.resolve(true)),
    getAvailablePurchases: jest.fn(() => Promise.resolve([])),
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

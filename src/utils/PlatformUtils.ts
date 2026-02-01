import { Platform } from 'react-native';

export const PlatformUtils = {
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',

    select: <T>(options: { ios?: T; android?: T; default: T }): T => {
        return (Platform.select({
            ios: options.ios,
            android: options.android,
            default: options.default
        }) ?? options.default) as T;
    },

    getNavigationHeight: (): number => {
        return (Platform.select({
            ios: 44, // iOS navigation bar height
            android: 56, // Android action bar height
            default: 50
        }) ?? 50) as number;
    }
};

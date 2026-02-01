import { NativeModules } from 'react-native';

let AdMobModule: any;

// Check if any of the expected native modules exist
const hasNativeAdMob = !!(
    NativeModules.RNGoogleMobileAdsModule ||
    NativeModules.RNGoogleMobileAdsBannerViewManager ||
    NativeModules.RNGoogleMobileAdsInterstitialModule
);

if (!hasNativeAdMob) {
    // Mock for Environments without the native module (Expo Go, etc.)
    AdMobModule = {
        InterstitialAd: {
            createForAdRequest: () => ({
                addAdEventListener: () => { },
                load: () => { },
                show: () => { },
                loaded: false,
            }),
        },
        AdEventType: {
            LOADED: 'loaded',
        },
        TestIds: {
            INTERSTITIAL: 'test-id',
            BANNER: 'test-id',
        },
        BannerAd: () => null,
        BannerAdSize: {
            ANCHORED_ADAPTIVE_BANNER: 'banner',
        },
    };
} else {
    try {
        // Only require if we are reasonably sure the native side exists
        AdMobModule = require('react-native-google-mobile-ads');
    } catch (e) {
        console.warn('AdMob native module detected but JS failed to load:', e);
        AdMobModule = null;
    }
}

export const InterstitialAd = AdMobModule?.InterstitialAd;
export const AdEventType = AdMobModule?.AdEventType;
export const TestIds = AdMobModule?.TestIds;
export const BannerAd = AdMobModule?.BannerAd;
export const BannerAdSize = AdMobModule?.BannerAdSize;

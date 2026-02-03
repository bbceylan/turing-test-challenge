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
            createForAdRequest: () => {
                let listeners: any = {};
                return {
                    addAdEventListener: (event: string, cb: any) => { listeners[event] = cb; },
                    load: () => {
                        // Simulate load delay
                        setTimeout(() => {
                            if (listeners['loaded']) listeners['loaded']();
                        }, 500);
                    },
                    show: () => {
                        // Mock visible ad
                        const { Alert } = require('react-native');
                        Alert.alert("Ad Break (Mock)", "This is a simulated interstitial ad.");
                    },
                    loaded: true,
                };
            },
        },
        AdEventType: {
            LOADED: 'loaded',
        },
        RewardedAdEventType: {
            LOADED: 'loaded',
            EARNED_REWARD: 'earned_reward',
        },
        RewardedAd: {
            createForAdRequest: () => {
                let listeners: any = {};
                return {
                    addAdEventListener: (event: string, cb: any) => { listeners[event] = cb; },
                    load: () => {
                        setTimeout(() => {
                            if (listeners['loaded']) listeners['loaded']();
                        }, 500);
                    },
                    show: () => {
                        const { Alert } = require('react-native');
                        Alert.alert("Rewarded Ad (Mock)", "Thanks for supporting! Ad-free time granted.");
                        if (listeners['earned_reward']) listeners['earned_reward']({ type: 'ad_free', amount: 1 });
                    },
                    loaded: true,
                };
            },
        },
        TestIds: {
            INTERSTITIAL: 'test-id',
            BANNER: 'test-id',
            REWARDED: 'test-id',
        },
        BannerAd: () => {
            const React = require('react');
            const { View, Text } = require('react-native');
            return React.createElement(View, {
                style: { width: 320, height: 50, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ccc' }
            }, React.createElement(Text, {
                style: { color: '#666', fontSize: 12 }
            }, "Mock Banner Ad"));
        },
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
export const RewardedAd = AdMobModule?.RewardedAd;
export const RewardedAdEventType = AdMobModule?.RewardedAdEventType;
export const TestIds = AdMobModule?.TestIds;
export const BannerAd = AdMobModule?.BannerAd;
export const BannerAdSize = AdMobModule?.BannerAdSize;

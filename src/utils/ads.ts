import { InterstitialAd, AdEventType, TestIds } from './ads_safe';
import { useStore } from '../store/useStore';
import Constants from 'expo-constants';

const adUnitId = (__DEV__ && TestIds) ? TestIds.INTERSTITIAL : 'YOUR_REAL_AD_UNIT_ID';

let interstitial: any = null;
let guessCount = 0;
let lastAdTime = Date.now(); // Track time for ad frequency

export const loadInterstitial = () => {
    if (Constants.appOwnership === 'expo' || !InterstitialAd) return;
    const { isPro } = useStore.getState();
    if (isPro) return;

    interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
        console.log('Interstitial Loaded');
    });

    interstitial.load();
};

export const showInterstitialIfReady = () => {
    const { isPro } = useStore.getState();
    if (isPro || Constants.appOwnership === 'expo' || !interstitial) return;

    guessCount++;
    const now = Date.now();
    const timeSinceLastAd = now - lastAdTime;

    // Show ad if: 3 questions answered OR 60 seconds passed
    if ((guessCount >= 3 || timeSinceLastAd >= 60000) && interstitial?.loaded) {
        interstitial.show();
        loadInterstitial(); // Preload next

        // Reset counters only if ad is shown
        guessCount = 0;
        lastAdTime = Date.now();
    }
};

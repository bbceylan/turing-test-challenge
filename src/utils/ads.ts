import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useStore } from '../store/useStore';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'YOUR_REAL_AD_UNIT_ID';

let interstitial: InterstitialAd | null = null;
let guessCount = 0;

export const loadInterstitial = () => {
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
    if (isPro) return;

    guessCount++;
    if (guessCount % 10 === 0 && interstitial?.loaded) {
        interstitial.show();
        loadInterstitial(); // Preload next
    }
};

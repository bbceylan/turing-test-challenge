import { InterstitialAd, AdEventType, TestIds } from './ads_safe';
import { useStore } from '../store/useStore';
import Constants from 'expo-constants';

const adUnitId = (__DEV__ && TestIds) ? TestIds.INTERSTITIAL : 'YOUR_REAL_AD_UNIT_ID';

let interstitial: any = null;
let guessCount = 0;

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
    if (guessCount % 10 === 0 && interstitial?.loaded) {
        interstitial.show();
        loadInterstitial(); // Preload next
    }
};

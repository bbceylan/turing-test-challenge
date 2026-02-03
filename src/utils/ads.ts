import { InterstitialAd, AdEventType, TestIds, RewardedAd, RewardedAdEventType } from './ads_safe';
import { useStore } from '../store/useStore';
import Constants from 'expo-constants';

const adConfig = (Constants.expoConfig as any)?.extra?.admob || {};
const adUnitId = (__DEV__ && TestIds) ? TestIds.INTERSTITIAL : (adConfig.interstitial || 'YOUR_REAL_AD_UNIT_ID');
const rewardedAdUnitId = (__DEV__ && TestIds) ? TestIds.REWARDED : (adConfig.rewarded || 'YOUR_REAL_REWARDED_AD_UNIT_ID');

let interstitial: any = null;
let rewarded: any = null;
let guessCount = 0;
let lastAdTime = Date.now(); // Track time for ad frequency

const isAdFreeActive = () => {
    const { isPro, adFreeUntil } = useStore.getState();
    return isPro || (!!adFreeUntil && adFreeUntil > Date.now());
};

const shouldUseMockAds = () => {
    const { forceMockAds } = useStore.getState();
    return __DEV__ && forceMockAds;
};

export const loadInterstitial = () => {
    if (!__DEV__ && Constants.appOwnership === 'expo') return;
    if (shouldUseMockAds()) {
        interstitial = InterstitialAd?.createForAdRequest?.(TestIds.INTERSTITIAL);
        interstitial?.load?.();
        return;
    }
    if (!InterstitialAd) return;
    if (isAdFreeActive()) return;

    interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
        console.log('Interstitial Loaded');
    });

    interstitial.load();
};

export const showInterstitialIfReady = () => {
    if (isAdFreeActive()) return;
    if (!__DEV__ && Constants.appOwnership === 'expo') return;
    if (!interstitial) return;
    if (shouldUseMockAds()) {
        interstitial?.show?.();
        loadInterstitial();
        return;
    }

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

export const loadRewarded = () => {
    if (!__DEV__ && Constants.appOwnership === 'expo') return;
    if (shouldUseMockAds()) {
        rewarded = RewardedAd?.createForAdRequest?.(TestIds.REWARDED);
        rewarded?.addAdEventListener?.(RewardedAdEventType?.EARNED_REWARD || 'earned_reward', () => {
            useStore.getState().grantAdFreeMinutes(60);
            useStore.getState().setRewardedReady(false);
        });
        rewarded?.load?.();
        useStore.getState().setRewardedReady(true);
        return;
    }
    if (!RewardedAd) return;
    if (isAdFreeActive()) return;

    useStore.getState().setRewardedReady(false);
    rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
        requestNonPersonalizedAdsOnly: true,
    });

    rewarded.addAdEventListener(RewardedAdEventType?.LOADED || 'loaded', () => {
        console.log('Rewarded Loaded');
        useStore.getState().setRewardedReady(true);
    });

    rewarded.addAdEventListener(RewardedAdEventType?.EARNED_REWARD || 'earned_reward', () => {
        useStore.getState().grantAdFreeMinutes(60);
        useStore.getState().setRewardedReady(false);
    });

    rewarded.load();
};

export const showRewardedIfReady = () => {
    if (isAdFreeActive()) return false;
    if (!__DEV__ && Constants.appOwnership === 'expo') return false;
    if (!rewarded) return false;
    if (shouldUseMockAds()) {
        rewarded?.show?.();
        loadRewarded();
        return true;
    }
    if (rewarded?.loaded) {
        rewarded.show();
        useStore.getState().setRewardedReady(false);
        loadRewarded();
        return true;
    }
    return false;
};

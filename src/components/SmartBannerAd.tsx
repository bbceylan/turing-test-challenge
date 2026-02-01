import React from 'react';
import { View } from 'react-native';
import { useStore } from '../store/useStore';
import { BannerAd, BannerAdSize, TestIds } from '../utils/ads_safe';
import Constants from 'expo-constants';

const adUnitId = (__DEV__ && TestIds) ? TestIds.BANNER : 'YOUR_REAL_AD_UNIT_ID';

export const SmartBannerAd = () => {
    const { isPro } = useStore();

    if (isPro || Constants.appOwnership === 'expo' || !BannerAd) return null;

    return (
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
};

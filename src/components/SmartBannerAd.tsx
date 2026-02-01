import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useStore } from '../store/useStore';

const adUnitId = __DEV__ ? TestIds.BANNER : 'YOUR_REAL_AD_UNIT_ID';

export const SmartBannerAd = () => {
    const { isPro } = useStore();

    if (isPro) return null;

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

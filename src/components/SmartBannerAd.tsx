import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';
import { BannerAd, BannerAdSize, TestIds } from '../utils/ads_safe';
import Constants from 'expo-constants';
import { COLORS, NEON_SHADOWS } from '../constants/theme';

const adConfig = (Constants.expoConfig as any)?.extra?.admob || {};
const adUnitId = (__DEV__ && TestIds) ? TestIds.BANNER : (adConfig.banner || 'YOUR_REAL_AD_UNIT_ID');

export const SmartBannerAd = () => {
    const { isPro, adFreeUntil } = useStore();

    const adFreeActive = !!adFreeUntil && adFreeUntil > Date.now();
    if (isPro || adFreeActive || Constants.appOwnership === 'expo' || !BannerAd) return null;

    return (
        <View style={styles.container}>
            <View style={styles.adWrapper}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    adWrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.glowPurple,
        ...NEON_SHADOWS.subtle,
    },
});

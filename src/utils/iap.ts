import { NativeModules } from 'react-native';
import Constants from 'expo-constants';

let iapAvailable = false;

const iapConfig = (Constants.expoConfig as any)?.extra?.iap || {};

export const getIapProductIds = () => {
    return (iapConfig.ios as string[] | undefined) ?? ['com.bbceylan.turingtest.pro'];
};

const hasNativeIap = () => {
    return !!(NativeModules.RNIapModule || NativeModules.RNIapIos);
};

const loadRNIap = () => {
    try {
        return require('react-native-iap');
    } catch {
        return null;
    }
};

export const initIap = async () => {
    if (!hasNativeIap()) {
        iapAvailable = false;
        return false;
    }
    const RNIap = loadRNIap();
    if (!RNIap) {
        iapAvailable = false;
        return false;
    }
    try {
        await RNIap.initConnection();
        iapAvailable = true;
        return true;
    } catch {
        iapAvailable = false;
        return false;
    }
};

export const endIap = async () => {
    if (!iapAvailable) return;
    const RNIap = loadRNIap();
    if (!RNIap) return;
    try {
        await RNIap.endConnection();
    } catch {
        // Ignore teardown errors
    }
};

export const fetchIapProducts = async () => {
    if (!iapAvailable) return [];
    const RNIap = loadRNIap();
    if (!RNIap) return [];
    const skus = getIapProductIds();
    if (skus.length === 0) return [];
    try {
        return await RNIap.getProducts({ skus });
    } catch {
        return [];
    }
};

export const purchasePro = async () => {
    if (!iapAvailable) throw new Error('IAP unavailable');
    const RNIap = loadRNIap();
    if (!RNIap) throw new Error('IAP unavailable');
    const [sku] = getIapProductIds();
    if (!sku) throw new Error('Missing product id');
    const purchase = await RNIap.requestPurchase({ sku });
    const result = Array.isArray(purchase) ? purchase[0] : purchase;
    if (result) {
        await RNIap.finishTransaction({ purchase: result, isConsumable: false });
    }
    return result;
};

export const restoreProPurchases = async () => {
    if (!iapAvailable) return false;
    const RNIap = loadRNIap();
    if (!RNIap) return false;
    const skus = getIapProductIds();
    if (skus.length === 0) return false;
    try {
        const purchases = await RNIap.getAvailablePurchases();
        return purchases?.some((p: any) => skus.includes(p.productId)) ?? false;
    } catch {
        return false;
    }
};

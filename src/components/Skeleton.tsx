import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

interface SkeletonProps {
    width?: number | string;
    height?: number;
    style?: ViewStyle;
}

export const Skeleton = ({ width = '100%', height = 20, style }: SkeletonProps) => {
    const { colors } = useTheme();
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                styles.skeleton,
                {
                    backgroundColor: colors.background.card,
                    width: width as any,
                    height,
                },
                style,
                animatedStyle,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    skeleton: {
        borderRadius: 4,
    },
});

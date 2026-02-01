import React from 'react';
import { Platform, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';

interface PlatformButtonProps {
    onPress: () => void;
    children: React.ReactNode;
}

export const PlatformButton: React.FC<PlatformButtonProps> = ({ onPress, children }) => {
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple('#e0e0e0', false)}>
                <View>{children}</View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            {children}
        </TouchableOpacity>
    );
};

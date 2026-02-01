import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuizView } from '../components/QuizView';
import { COLORS } from '../constants/theme';

export const PlayScreen = () => {
    return (
        <View style={styles.container}>
            <QuizView />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.navy,
    }
});

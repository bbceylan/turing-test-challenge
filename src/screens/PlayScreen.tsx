import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuizView } from '../components/QuizView';
import { CategorySelector } from '../components/CategorySelector';
import { SmartBannerAd } from '../components/SmartBannerAd';
import { COLORS } from '../constants/theme';

export const PlayScreen = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    return (
        <View style={styles.container}>
            {!selectedCategory ? (
                <CategorySelector onSelect={setSelectedCategory} />
            ) : (
                <QuizView
                    category={selectedCategory}
                    onBack={() => setSelectedCategory(null)}
                />
            )}
            <SmartBannerAd />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.navy,
    }
});

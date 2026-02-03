import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuizView } from '../components/QuizView';
import { CategorySelector } from '../components/CategorySelector';
import { SmartBannerAd } from '../components/SmartBannerAd';
import { COLORS } from '../constants/theme';

export const PlayScreen = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Load the first interstitial when the screen mounts
        import('../utils/ads').then(mod => mod.loadInterstitial());
    }, []);

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

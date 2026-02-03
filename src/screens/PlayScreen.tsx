import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuizView } from '../components/QuizView';
import { CategorySelector } from '../components/CategorySelector';
import { SmartBannerAd } from '../components/SmartBannerAd';
import { useTheme } from '../hooks/useTheme';

interface PlayScreenProps {
    onNavigateToLeaderboard?: () => void;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({ onNavigateToLeaderboard }) => {
    const { colors } = useTheme();
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Load the first interstitial when the screen mounts
        import('../utils/ads').then(mod => mod.loadInterstitial());
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            {!selectedCategory ? (
                <CategorySelector onSelect={setSelectedCategory} />
            ) : (
                <QuizView
                    category={selectedCategory}
                    onBack={() => setSelectedCategory(null)}
                    onNavigateToLeaderboard={onNavigateToLeaderboard}
                />
            )}
            <SmartBannerAd />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

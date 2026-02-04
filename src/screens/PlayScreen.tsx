import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuizView } from '../components/QuizView';
import { CategorySelector } from '../components/CategorySelector';
import { useTheme } from '../hooks/useTheme';
import { THEME_PACKS } from '../utils/themePacks';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';

interface PlayScreenProps {
    onNavigateToLeaderboard?: () => void;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({ onNavigateToLeaderboard }) => {
    const { colors } = useTheme();
    const { stats } = useStore();
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [selectedPack, setSelectedPack] = React.useState<string | null>(null);
    const [mode, setMode] = React.useState<'SELECT' | 'CATEGORY' | 'DAILY' | 'PACK' | 'GHOST'>('SELECT');

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            {mode === 'SELECT' && (
                <CategorySelector
                    onSelect={(category) => {
                        setSelectedCategory(category);
                        setMode('CATEGORY');
                    }}
                    onSelectDaily={() => {
                        setSelectedCategory(null);
                        setMode('DAILY');
                    }}
                    onSelectPack={(packId) => {
                        setSelectedPack(packId);
                        setMode('PACK');
                    }}
                    onSelectGhost={() => {
                        setSelectedCategory(null);
                        setSelectedPack(null);
                        setMode('GHOST');
                    }}
                />
            )}
            {mode === 'CATEGORY' && selectedCategory && (
                <QuizView
                    mode="STANDARD"
                    category={selectedCategory}
                    onBack={() => {
                        setSelectedCategory(null);
                        setMode('SELECT');
                    }}
                    onNavigateToLeaderboard={onNavigateToLeaderboard ?? (() => navigation.navigate('Local' as never))}
                />
            )}
            {mode === 'DAILY' && (
                <QuizView
                    mode="DAILY"
                    onBack={() => {
                        setSelectedCategory(null);
                        setMode('SELECT');
                    }}
                    onNavigateToLeaderboard={onNavigateToLeaderboard ?? (() => navigation.navigate('Local' as never))}
                />
            )}
            {mode === 'PACK' && selectedPack && (
                <QuizView
                    mode="PACK"
                    categories={THEME_PACKS.find(p => p.id === selectedPack)?.categories || []}
                    onBack={() => {
                        setSelectedPack(null);
                        setMode('SELECT');
                    }}
                    onNavigateToLeaderboard={onNavigateToLeaderboard ?? (() => navigation.navigate('Local' as never))}
                />
            )}
            {mode === 'GHOST' && (
                <QuizView
                    mode="GHOST"
                    roundLimit={10}
                    ghostTarget={stats.ghostBestScore}
                    onBack={() => {
                        setSelectedPack(null);
                        setMode('SELECT');
                    }}
                    onNavigateToLeaderboard={onNavigateToLeaderboard ?? (() => navigation.navigate('Local' as never))}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

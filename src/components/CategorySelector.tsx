import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/theme';
import { getCategories } from '../utils/mockData';
import { BookOpen, Brain, FlaskConical, Ghost, Monitor, Scroll, Sparkles } from 'lucide-react-native';

interface CategorySelectorProps {
    onSelect: (category: string) => void;
}

const getIconForCategory = (category: string, color: string) => {
    switch (category) {
        case 'Literature': return <BookOpen size={24} color={color} />;
        case 'Philosophy': return <Brain size={24} color={color} />;
        case 'Science': return <FlaskConical size={24} color={color} />;
        case 'Fantasy': return <Sparkles size={24} color={color} />;
        case 'Horror': return <Ghost size={24} color={color} />;
        case 'Religious': return <Scroll size={24} color={color} />;
        default: return <Monitor size={24} color={color} />;
    }
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
    const categories = useMemo(() => getCategories(), []);

    return (
        <View style={styles.container}>
            {/* Cyberpunk Welcome Header */}
            <View style={styles.welcomeContainer}>
                <View style={styles.scanlineOverlay} />
                <Text style={styles.welcomeLabel}>// SYSTEM ONLINE //</Text>
                <Text style={styles.welcomeTitle}>Welcome, Agent.</Text>
                <Text style={styles.missionText}>
                    Distinguish human from machine.{'\n'}
                    Your training begins now.
                </Text>
            </View>

            <Text style={styles.title}>SELECT MISSION</Text>
            <ScrollView contentContainerStyle={styles.grid}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={styles.card}
                        onPress={() => onSelect(category)}
                        accessibilityRole="button"
                        accessibilityLabel={`Select ${category} category`}
                    >
                        <BlurView intensity={20} tint="light" style={styles.blur}>
                            <View style={styles.iconContainer}>
                                {getIconForCategory(category, COLORS.cyan)}
                            </View>
                            <Text style={styles.categoryText}>{category}</Text>
                        </BlurView>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    // Cyberpunk Welcome Styles
    welcomeContainer: {
        marginBottom: 24,
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: COLORS.cyan,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 240, 255, 0.05)',
        shadowColor: COLORS.cyan,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        position: 'relative',
        overflow: 'hidden',
    },
    scanlineOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 240, 255, 0.1)',
    },
    welcomeLabel: {
        fontSize: 10,
        fontWeight: '400',
        color: COLORS.cyan,
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: 'monospace',
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.white,
        marginBottom: 8,
        textShadowColor: COLORS.cyan,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    missionText: {
        fontSize: 14,
        color: COLORS.gray,
        lineHeight: 20,
        fontFamily: 'monospace',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.cyan,
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 100,
    },
    card: {
        width: '48%',
        aspectRatio: 1.2,
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.purple,
    },
    blur: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
    },
    iconContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 240, 255, 0.3)',
    },
    categoryText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1,
    }
});

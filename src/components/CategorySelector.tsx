import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/theme';
import { getCategories } from '../utils/mockData';
import { BookOpen, Code, Feather, Hash, Heart, Laugh, Monitor, Utensils } from 'lucide-react-native';

interface CategorySelectorProps {
    onSelect: (category: string) => void;
}

const getIconForCategory = (category: string, color: string) => {
    switch (category) {
        case 'Philosophy': return <BookOpen size={24} color={color} />;
        case 'Poetry': return <Feather size={24} color={color} />;
        case 'Coding': return <Code size={24} color={color} />;
        case 'Humor': return <Laugh size={24} color={color} />;
        case 'Empathy': return <Heart size={24} color={color} />;
        case 'Abstract': return <Hash size={24} color={color} />;
        case 'Romance': return <Heart size={24} color={color} />;
        case 'Culinary': return <Utensils size={24} color={color} />;
        default: return <Monitor size={24} color={color} />;
    }
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
    const categories = useMemo(() => getCategories(), []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Challenge</Text>
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
        paddingTop: 80, // Clearance for top
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 30,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 100, // Clearance for TabBar
    },
    card: {
        width: '48%',
        aspectRatio: 1.2,
        marginBottom: 15,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    blur: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    iconContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        borderRadius: 12,
    },
    categoryText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    }
});

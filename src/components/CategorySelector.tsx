import React, { useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import { getCategories } from '../utils/mockData';
import { BookOpen, Brain, FlaskConical, Ghost, Monitor, Scroll, Sparkles } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    FadeInDown,
    Easing,
} from 'react-native-reanimated';

interface CategorySelectorProps {
    onSelect: (category: string) => void;
}

// Miami/Cyberpunk category colors
const CATEGORY_COLORS: Record<string, string> = {
    'Literature': COLORS.neonCyan,
    'Philosophy': COLORS.neonPurple,
    'Science': '#00FF88', // Neon green
    'Fantasy': COLORS.neonPink,
    'Horror': COLORS.sunsetPink,
    'Religious': COLORS.sunsetOrange,
};

const getIconForCategory = (category: string) => {
    const color = CATEGORY_COLORS[category] || COLORS.neonCyan;
    switch (category) {
        case 'Literature': return <BookOpen size={28} color={color} />;
        case 'Philosophy': return <Brain size={28} color={color} />;
        case 'Science': return <FlaskConical size={28} color={color} />;
        case 'Fantasy': return <Sparkles size={28} color={color} />;
        case 'Horror': return <Ghost size={28} color={color} />;
        case 'Religious': return <Scroll size={28} color={color} />;
        default: return <Monitor size={28} color={color} />;
    }
};

// Animated scanline component
const AnimatedScanline = () => {
    const translateY = useSharedValue(-50);

    useEffect(() => {
        translateY.value = withRepeat(
            withTiming(400, { duration: 2000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return <Animated.View style={[styles.scanlineEffect, animatedStyle]} />;
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
    const { colors } = useTheme();
    const categories = useMemo(() => getCategories(), []);

    // Flicker effect for title
    const titleOpacity = useSharedValue(1);

    useEffect(() => {
        titleOpacity.value = withRepeat(
            withSequence(
                withTiming(0.7, { duration: 100 }),
                withTiming(1, { duration: 100 }),
            ),
            -1,
            true
        );
    }, []);

    const titleFlicker = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
    }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            {/* Animated scanline */}
            <AnimatedScanline />

            {/* Grid overlay for cyberpunk feel */}
            <View style={styles.gridOverlay} />

            {/* Cyberpunk Welcome Header */}
            <Animated.View
                entering={FadeInDown.delay(100).duration(300)}
                style={[styles.welcomeContainer, NEON_SHADOWS.cyan]}
            >
                <View style={styles.cornerBracket} />
                <View style={[styles.cornerBracket, styles.cornerTopRight]} />
                <View style={[styles.cornerBracket, styles.cornerBottomLeft]} />
                <View style={[styles.cornerBracket, styles.cornerBottomRight]} />

                <Text style={styles.welcomeLabel}>// SYSTEM ONLINE //</Text>
                <Text style={[styles.welcomeTitle, NEON_SHADOWS.cyan]}>Welcome, Agent.</Text>
                <Text style={styles.missionText}>
                    Distinguish human from machine.{'\n'}
                    Your training begins now.
                </Text>
            </Animated.View>

            <Animated.Text style={[styles.title, titleFlicker]}>SELECT MISSION</Animated.Text>
            <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                {categories.map((category, index) => {
                    const categoryColor = CATEGORY_COLORS[category] || COLORS.neonCyan;
                    return (
                        <Animated.View
                            key={category}
                            entering={FadeInDown.delay(200 + index * 80).springify()}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.card,
                                    { borderColor: categoryColor },
                                    { shadowColor: categoryColor, shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } }
                                ]}
                                onPress={() => onSelect(category)}
                                accessibilityRole="button"
                                accessibilityLabel={`Select ${category} category`}
                            >
                                <BlurView intensity={15} tint="dark" style={styles.blur}>
                                    <View style={[styles.iconContainer, { borderColor: categoryColor, backgroundColor: `${categoryColor}15` }]}>
                                        {getIconForCategory(category)}
                                    </View>
                                    <Text style={[styles.categoryText, { color: categoryColor }]}>{category}</Text>
                                </BlurView>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        position: 'relative',
        overflow: 'hidden',
    },
    // Animated scanline
    scanlineEffect: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: COLORS.neonCyan,
        opacity: 0.3,
        zIndex: 100,
    },
    // Grid overlay for cyberpunk feel
    gridOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        backgroundColor: 'transparent',
        borderLeftWidth: 1,
        borderLeftColor: COLORS.neonCyan,
        zIndex: 0,
    },
    // Cyberpunk Welcome Styles
    welcomeContainer: {
        marginBottom: 24,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: COLORS.neonCyan,
        borderRadius: 4,
        backgroundColor: 'rgba(0, 240, 255, 0.03)',
        position: 'relative',
        overflow: 'visible',
    },
    // Corner brackets for cyberpunk frame
    cornerBracket: {
        position: 'absolute',
        top: -4,
        left: -4,
        width: 20,
        height: 20,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: COLORS.neonPink,
    },
    cornerTopRight: {
        left: undefined,
        right: -4,
        borderLeftWidth: 0,
        borderRightWidth: 3,
    },
    cornerBottomLeft: {
        top: undefined,
        bottom: -4,
        borderTopWidth: 0,
        borderBottomWidth: 3,
    },
    cornerBottomRight: {
        top: undefined,
        bottom: -4,
        left: undefined,
        right: -4,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 3,
        borderRightWidth: 3,
    },
    welcomeLabel: {
        fontSize: 10,
        fontWeight: '400',
        color: COLORS.neonCyan,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 10,
        fontFamily: 'monospace',
    },
    welcomeTitle: {
        fontSize: 36,
        fontWeight: '700',
        color: COLORS.white,
        marginBottom: 10,
        textShadowColor: COLORS.neonCyan,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    missionText: {
        fontSize: 13,
        color: COLORS.gray,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.neonPink,
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 6,
        textTransform: 'uppercase',
        textShadowColor: COLORS.neonPink,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 120,
    },
    card: {
        width: '48%',
        aspectRatio: 1.1,
        marginBottom: 16,
        borderRadius: 4,
        overflow: 'hidden',
        borderWidth: 2,
    },
    blur: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'rgba(10, 14, 41, 0.8)',
    },
    iconContainer: {
        marginBottom: 12,
        padding: 14,
        borderRadius: 4,
        borderWidth: 1,
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 2,
        textTransform: 'uppercase',
    }
});

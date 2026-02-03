import React, { useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import { getCategories } from '../utils/mockData';
import { THEME_PACKS } from '../utils/themePacks';
import { BookOpen, Brain, FlaskConical, Ghost, Monitor, Scroll, Sparkles } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    withDelay,
    FadeInDown,
    Easing,
} from 'react-native-reanimated';

interface CategorySelectorProps {
    onSelect: (category: string) => void;
    onSelectDaily?: () => void;
    onSelectPack?: (packId: string) => void;
    onSelectGhost?: () => void;
}

// Miami/Cyberpunk category colors - all unique
const CATEGORY_COLORS: Record<string, string> = {
    'Literature': COLORS.neonCyan,
    'Philosophy': '#FF6BFF', // Bright magenta
    'Science': '#00FF88', // Neon green
    'Fantasy': COLORS.neonPink,
    'Horror': '#FF3333', // Neon red
    'Religious': '#FFD700', // Gold
    'History': COLORS.sunsetOrange,
    'Pop Culture': '#00FFFF', // Bright cyan
};

const getIconForCategory = (category: string) => {
    const color = CATEGORY_COLORS[category] || COLORS.neonCyan;
    switch (category) {
        case 'Literature': return <BookOpen size={32} color={color} />;
        case 'Philosophy': return <Brain size={32} color={color} />;
        case 'Science': return <FlaskConical size={32} color={color} />;
        case 'Fantasy': return <Sparkles size={32} color={color} />;
        case 'Horror': return <Ghost size={32} color={color} />;
        case 'Religious': return <Scroll size={32} color={color} />;
        case 'History': return <Scroll size={32} color={color} />;
        case 'Pop Culture': return <Monitor size={32} color={color} />;
        default: return <Monitor size={32} color={color} />;
    }
};

// Animated card with blinking glow
const AnimatedCategoryCard = ({ category, onSelect, index }: { category: string; onSelect: (cat: string) => void; index: number }) => {
    const categoryColor = CATEGORY_COLORS[category] || COLORS.neonCyan;
    const glowOpacity = useSharedValue(0.3);

    useEffect(() => {
        // Stagger the animation start for each card
        const delay = index * 200;
        glowOpacity.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
                ),
                -1,
                true
            )
        );
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        shadowOpacity: glowOpacity.value,
    }));

    return (
        <Animated.View
            entering={FadeInDown.delay(150 + index * 60).springify()}
            style={[
                styles.cardWrapper,
                glowStyle,
                { shadowColor: categoryColor }
            ]}
        >
            <TouchableOpacity
                style={[styles.card, { borderColor: categoryColor }]}
                onPress={() => onSelect(category)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Select ${category} category`}
            >
                <View style={[styles.cardInner, { backgroundColor: `${categoryColor}10` }]}>
                    <View style={[styles.iconContainer, { borderColor: categoryColor, backgroundColor: `${categoryColor}20` }]}>
                        {getIconForCategory(category)}
                    </View>
                    <Text style={[styles.categoryText, { color: categoryColor }]}>{category}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
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

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect, onSelectDaily, onSelectPack, onSelectGhost }) => {
    const { colors } = useTheme();
    const categories = useMemo(() => getCategories(), []);
    const packs = useMemo(() => THEME_PACKS, []);

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

            {onSelectDaily && (
                <TouchableOpacity
                    style={[styles.dailyCard, { borderColor: COLORS.neonCyan, backgroundColor: 'rgba(0, 240, 255, 0.08)' }]}
                    onPress={onSelectDaily}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Start Daily Ritual"
                >
                    <View style={styles.dailyCardInner}>
                        <Text style={styles.dailyLabel}>DAILY RITUAL</Text>
                        <Text style={styles.dailySubLabel}>One shot. Bonus XP.</Text>
                    </View>
                </TouchableOpacity>
            )}

            {onSelectGhost && (
                <TouchableOpacity
                    style={[styles.dailyCard, { borderColor: COLORS.neonPink, backgroundColor: 'rgba(255, 45, 171, 0.08)' }]}
                    onPress={onSelectGhost}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Start Ghost Run"
                >
                    <View style={styles.dailyCardInner}>
                        <Text style={[styles.dailyLabel, { color: COLORS.neonPink }]}>GHOST RUN</Text>
                        <Text style={styles.dailySubLabel}>10 rounds. Beat your best.</Text>
                    </View>
                </TouchableOpacity>
            )}

            {onSelectPack && (
                <View style={styles.packGrid}>
                    <Text style={styles.sectionLabel}>THEME PACKS</Text>
                    {packs.map((pack: any) => (
                        <TouchableOpacity
                            key={pack.id}
                            style={[styles.packCard, { borderColor: COLORS.purple }]}
                            onPress={() => onSelectPack(pack.id)}
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel={`Select ${pack.title} pack`}
                        >
                            <Text style={styles.packTitle}>{pack.title}</Text>
                            <Text style={styles.packSubtitle}>{pack.subtitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionLabel}>CATEGORIES</Text>
                {categories.map((category, index) => (
                    <AnimatedCategoryCard
                        key={category}
                        category={category}
                        onSelect={onSelect}
                        index={index}
                    />
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
        gap: 2,
    },
    packGrid: {
        marginBottom: 16,
        gap: 10,
    },
    sectionLabel: {
        color: COLORS.gray,
        fontSize: 11,
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    packCard: {
        borderWidth: 1,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
    },
    packTitle: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    packSubtitle: {
        color: COLORS.gray,
        fontSize: 11,
        marginTop: 4,
    },
    dailyCard: {
        borderWidth: 2,
        borderRadius: 18,
        padding: 16,
        marginBottom: 18,
    },
    dailyCardInner: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
    },
    dailyLabel: {
        color: COLORS.neonCyan,
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    dailySubLabel: {
        color: COLORS.gray,
        fontSize: 12,
        marginTop: 6,
        letterSpacing: 0.5,
    },
    cardWrapper: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
    },
    card: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2,
    },
    cardInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'rgba(10, 14, 41, 0.95)',
    },
    iconContainer: {
        marginBottom: 16,
        padding: 18,
        borderRadius: 16,
        borderWidth: 1,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    }
});

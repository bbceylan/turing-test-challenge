import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import { getDb } from '../db/client';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Flame, Zap, Award, BookOpen, Crown } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

interface Milestone {
    id: string;
    title: string;
    description: string;
    category: string;
    completed_at: string | null;
}

interface CategoryConfig {
    key: string;
    title: string;
    icon: React.ReactNode;
    color: string;
}

// Miami/Cyberpunk color palette for each category
const CATEGORY_CONFIG: CategoryConfig[] = [
    { key: 'beginner', title: 'Beginner', icon: <Zap size={20} color={COLORS.neonCyan} />, color: COLORS.neonCyan },
    { key: 'streak', title: 'Streak Masters', icon: <Flame size={20} color={COLORS.sunsetOrange} />, color: COLORS.sunsetOrange },
    { key: 'xp', title: 'XP Collectors', icon: <Award size={20} color="#00FF88" />, color: '#00FF88' }, // Neon green
    { key: 'category', title: 'Category Experts', icon: <BookOpen size={20} color={COLORS.neonPink} />, color: COLORS.neonPink },
    { key: 'special', title: 'Special Combos', icon: <Zap size={20} color="#FF6BFF" />, color: '#FF6BFF' }, // Bright magenta
    { key: 'legendary', title: 'Legendary', icon: <Crown size={20} color="#FFD700" />, color: '#FFD700' }, // Gold
];

const MilestoneCard = React.memo(({ item, colors }: { item: Milestone; colors: any }) => (
    <Animated.View
        layout={Layout.springify()}
        style={[
            styles.card,
            item.completed_at && styles.completedCard,
            item.completed_at && NEON_SHADOWS.cyan,
        ]}
    >
        <View style={styles.info}>
            <Text style={[styles.milestoneTitle, { color: colors.text.primary }]}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
        {item.completed_at ? (
            <CheckCircle2 color={COLORS.neonCyan} size={24} />
        ) : (
            <Circle color={COLORS.gray} size={24} />
        )}
    </Animated.View>
));

const CategorySection = React.memo(({
    config,
    milestones,
    colors,
    isExpanded,
    onToggle,
}: {
    config: CategoryConfig;
    milestones: Milestone[];
    colors: any;
    isExpanded: boolean;
    onToggle: () => void;
}) => {
    const completedCount = milestones.filter(m => m.completed_at).length;
    const totalCount = milestones.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <View style={styles.categorySection}>
            <TouchableOpacity
                style={styles.categoryHeader}
                onPress={onToggle}
                activeOpacity={0.7}
            >
                <View style={styles.categoryHeaderLeft}>
                    <View style={[styles.categoryIconContainer, { borderColor: config.color }]}>
                        {config.icon}
                    </View>
                    <View>
                        <Text style={[styles.categoryTitle, { color: colors.text.primary }]}>
                            {config.title}
                        </Text>
                        <Text style={[styles.categoryProgress, { color: config.color }]}>
                            {completedCount}/{totalCount} completed
                        </Text>
                    </View>
                </View>
                <View style={styles.categoryHeaderRight}>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                { width: `${progressPercent}%`, backgroundColor: config.color }
                            ]}
                        />
                    </View>
                    {isExpanded ? (
                        <ChevronUp size={20} color={colors.text.secondary} />
                    ) : (
                        <ChevronDown size={20} color={colors.text.secondary} />
                    )}
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.categoryContent}>
                    {milestones.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            entering={FadeInDown.delay(index * 50).springify()}
                        >
                            <MilestoneCard item={item} colors={colors} />
                        </Animated.View>
                    ))}
                </View>
            )}
        </View>
    );
});

export const MilestoneScreen = () => {
    const { colors } = useTheme();
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['beginner']));

    useEffect(() => {
        loadMilestones();
    }, []);

    const loadMilestones = async () => {
        const db = await getDb();
        const results = await db.getAllAsync<Milestone>('SELECT * FROM milestones');
        setMilestones(results);
    };

    const groupedMilestones = useMemo(() => {
        const grouped: Record<string, Milestone[]> = {};
        CATEGORY_CONFIG.forEach(cat => {
            grouped[cat.key] = milestones.filter(m => m.category === cat.key);
        });
        return grouped;
    }, [milestones]);

    const toggleCategory = (key: string) => {
        setExpandedCategories(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    // Overall progress
    const totalCompleted = milestones.filter(m => m.completed_at).length;
    const totalMilestones = milestones.length;

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.title, { color: colors.text.accent }]}>Achievements</Text>
                <View style={styles.overallProgress}>
                    <Text style={styles.overallProgressText}>
                        {totalCompleted}/{totalMilestones} Unlocked
                    </Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {CATEGORY_CONFIG.map((config) => (
                    <CategorySection
                        key={config.key}
                        config={config}
                        milestones={groupedMilestones[config.key] || []}
                        colors={colors}
                        isExpanded={expandedCategories.has(config.key)}
                        onToggle={() => toggleCategory(config.key)}
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
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    overallProgress: {
        backgroundColor: 'rgba(110, 44, 243, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    overallProgressText: {
        color: COLORS.neonPurple,
        fontSize: 14,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    categorySection: {
        marginBottom: 16,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(110, 44, 243, 0.3)',
    },
    categoryHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    categoryIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryProgress: {
        fontSize: 12,
        marginTop: 2,
    },
    categoryHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    progressBarContainer: {
        width: 60,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 2,
    },
    categoryContent: {
        marginTop: 12,
        paddingLeft: 8,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    completedCard: {
        borderColor: COLORS.neonCyan,
        backgroundColor: 'rgba(0, 240, 255, 0.05)',
    },
    info: {
        flex: 1,
    },
    milestoneTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        color: COLORS.gray,
        fontSize: 13,
    },
});

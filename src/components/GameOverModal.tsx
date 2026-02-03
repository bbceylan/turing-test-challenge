import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { COLORS, NEON_SHADOWS } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';
import { Crown, Trophy, Zap, RotateCcw, Award } from 'lucide-react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    withDelay,
    Easing,
    FadeIn,
    ZoomIn,
} from 'react-native-reanimated';

interface GameOverModalProps {
    visible: boolean;
    sessionStreak: number;
    maxStreak: number;
    sessionXp: number;
    isNewRecord: boolean;
    onTryAgain: () => void;
    onViewLeaderboard: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
    visible,
    sessionStreak,
    maxStreak,
    sessionXp,
    isNewRecord,
    onTryAgain,
    onViewLeaderboard,
}) => {
    const { colors } = useTheme();

    // Glitch/flicker animation for "GAME OVER" text - faster
    const glitchOpacity = useSharedValue(1);
    // Pulsing glow for Try Again button
    const buttonGlow = useSharedValue(0.5);
    const buttonScale = useSharedValue(1);

    useEffect(() => {
        if (visible) {
            // Faster glitch effect
            glitchOpacity.value = withRepeat(
                withSequence(
                    withTiming(0.6, { duration: 50 }),
                    withTiming(1, { duration: 50 }),
                    withTiming(0.8, { duration: 30 }),
                    withTiming(1, { duration: 70 }),
                ),
                -1,
                false
            );
            // Pulsing button glow
            buttonGlow.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0.4, { duration: 400, easing: Easing.inOut(Easing.ease) }),
                ),
                -1,
                true
            );
            // Subtle scale pulse
            buttonScale.value = withRepeat(
                withSequence(
                    withTiming(1.02, { duration: 500 }),
                    withTiming(1, { duration: 500 }),
                ),
                -1,
                true
            );
        }
    }, [visible]);

    const glitchStyle = useAnimatedStyle(() => ({
        opacity: glitchOpacity.value,
    }));

    const buttonPulseStyle = useAnimatedStyle(() => ({
        shadowOpacity: buttonGlow.value,
        shadowRadius: 15 * buttonGlow.value,
        transform: [{ scale: buttonScale.value }],
    }));

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <Animated.View
                    entering={ZoomIn.duration(200).springify().damping(12)}
                    style={[styles.modal, { backgroundColor: colors.background.primary }]}
                >
                    {/* Game Over Title */}
                    <Animated.Text style={[styles.gameOverText, glitchStyle]}>
                        GAME OVER
                    </Animated.Text>

                    {/* Stats Container */}
                    <View style={styles.statsContainer}>
                        {/* Session Streak */}
                        <Animated.View
                            entering={FadeIn.delay(100).duration(150)}
                            style={[styles.statCard, { borderColor: colors.border.default }]}
                        >
                            <Zap color={COLORS.sunsetOrange} size={28} />
                            <Text style={styles.statValue}>{sessionStreak}</Text>
                            <Text style={styles.statLabel}>This Run</Text>
                        </Animated.View>

                        {/* Max Streak */}
                        <Animated.View
                            entering={FadeIn.delay(150).duration(150)}
                            style={[
                                styles.statCard,
                                styles.maxStreakCard,
                                isNewRecord && styles.newRecordCard,
                                { borderColor: isNewRecord ? COLORS.neonCyan : colors.border.default }
                            ]}
                        >
                            {isNewRecord ? (
                                <Crown color={COLORS.neonCyan} size={28} />
                            ) : (
                                <Trophy color={COLORS.neonPink} size={28} />
                            )}
                            <Text style={[styles.statValue, isNewRecord && styles.newRecordValue]}>
                                {maxStreak}
                            </Text>
                            <Text style={styles.statLabel}>Best Streak</Text>
                            {isNewRecord && (
                                <View style={styles.newRecordBadge}>
                                    <Text style={styles.newRecordBadgeText}>NEW!</Text>
                                </View>
                            )}
                        </Animated.View>

                        {/* XP Earned */}
                        <Animated.View
                            entering={FadeIn.delay(200).duration(150)}
                            style={[styles.statCard, { borderColor: colors.border.default }]}
                        >
                            <Award color={COLORS.neonPurple} size={28} />
                            <Text style={styles.statValue}>+{sessionXp}</Text>
                            <Text style={styles.statLabel}>XP Earned</Text>
                        </Animated.View>
                    </View>

                    {/* Action Buttons */}
                    <Animated.View entering={FadeIn.delay(250).duration(150)} style={styles.buttonContainer}>
                        <Animated.View style={[styles.tryAgainWrapper, buttonPulseStyle]}>
                            <TouchableOpacity
                                style={[styles.button, styles.primaryButton]}
                                onPress={onTryAgain}
                                activeOpacity={0.8}
                            >
                                <RotateCcw color={COLORS.white} size={20} />
                                <Text style={styles.primaryButtonText}>Try Again</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <TouchableOpacity
                            style={[styles.button, styles.secondaryButton]}
                            onPress={onViewLeaderboard}
                            activeOpacity={0.8}
                        >
                            <Trophy color={COLORS.neonCyan} size={20} />
                            <Text style={styles.secondaryButtonText}>Leaderboard</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(10, 14, 41, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modal: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.neonPink,
        ...NEON_SHADOWS.pink,
    },
    gameOverText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.neonPink,
        letterSpacing: 4,
        marginBottom: 30,
        textShadowColor: COLORS.glowPink,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
    },
    maxStreakCard: {
        // Additional styling for emphasis
    },
    newRecordCard: {
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        ...NEON_SHADOWS.cyan,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        marginTop: 8,
    },
    newRecordValue: {
        color: COLORS.neonCyan,
    },
    statLabel: {
        fontSize: 11,
        color: COLORS.gray,
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    newRecordBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: COLORS.neonCyan,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    newRecordBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.navy,
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    tryAgainWrapper: {
        shadowColor: COLORS.neonCyan,
        shadowOffset: { width: 0, height: 0 },
        borderRadius: 12,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 10,
    },
    primaryButton: {
        backgroundColor: COLORS.neonPurple,
        borderWidth: 1,
        borderColor: COLORS.neonCyan,
    },
    primaryButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.neonCyan,
    },
    secondaryButtonText: {
        color: COLORS.neonCyan,
        fontSize: 16,
        fontWeight: '600',
    },
});

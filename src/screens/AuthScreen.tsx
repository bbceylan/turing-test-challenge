import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from '../utils/supabase';
import { COLORS } from '../constants/theme';
import { useStore } from '../store/useStore';

// Required for proper OAuth handling
WebBrowser.maybeCompleteAuthSession();

export const AuthScreen = () => {
    const [loading, setLoading] = useState(false);
    const { setGuest, setSession } = useStore();

    // Generate redirect URI for OAuth
    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'turingtest',
        path: 'auth/callback',
    });

    const handleAppleSignIn = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'apple',
                options: {
                    redirectTo: redirectUri,
                    skipBrowserRedirect: true,
                },
            });

            if (error) {
                Alert.alert('Apple Sign-In Error', error.message);
                return;
            }

            if (data?.url) {
                const result = await WebBrowser.openAuthSessionAsync(
                    data.url,
                    redirectUri
                );

                if (result.type === 'success') {
                    const url = new URL(result.url);
                    const params = new URLSearchParams(url.hash.slice(1));
                    const accessToken = params.get('access_token');
                    const refreshToken = params.get('refresh_token');

                    if (accessToken && refreshToken) {
                        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });

                        if (sessionError) {
                            Alert.alert('Session Error', sessionError.message);
                        } else if (sessionData.session) {
                            setSession(sessionData.session);
                        }
                    }
                }
            }
        } catch (e: any) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUri,
                    skipBrowserRedirect: true,
                },
            });

            if (error) {
                Alert.alert('Google Sign-In Error', error.message);
                return;
            }

            if (data?.url) {
                const result = await WebBrowser.openAuthSessionAsync(
                    data.url,
                    redirectUri
                );

                if (result.type === 'success') {
                    const url = new URL(result.url);
                    const params = new URLSearchParams(url.hash.slice(1));
                    const accessToken = params.get('access_token');
                    const refreshToken = params.get('refresh_token');

                    if (accessToken && refreshToken) {
                        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });

                        if (sessionError) {
                            Alert.alert('Session Error', sessionError.message);
                        } else if (sessionData.session) {
                            setSession(sessionData.session);
                        }
                    }
                }
            }
        } catch (e: any) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Cyberpunk Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.systemLabel}>// AUTHENTICATION REQUIRED //</Text>
                <Text style={styles.title}>Initialize Agent</Text>
                <Text style={styles.subtitle}>
                    Verify your identity to sync progress across devices
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.appleButton, loading && styles.disabledButton]}
                    disabled={loading}
                    onPress={handleAppleSignIn}
                    accessibilityRole="button"
                    accessibilityLabel="Sign in with Apple"
                >
                    <Text style={[styles.buttonText, styles.appleText]}>
                        Sign in with Apple
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.googleButton, loading && styles.disabledButton]}
                    disabled={loading}
                    onPress={handleGoogleSignIn}
                    accessibilityRole="button"
                    accessibilityLabel="Sign in with Google"
                >
                    <Text style={[styles.buttonText, styles.googleText]}>
                        Sign in with Google
                    </Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                    style={[styles.button, styles.guestButton]}
                    disabled={loading}
                    onPress={() => setGuest(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Continue as guest"
                >
                    <Text style={[styles.buttonText, styles.guestText]}>
                        Continue as Guest
                    </Text>
                </TouchableOpacity>

                <Text style={styles.guestNote}>
                    Guest progress is stored locally only
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.navy,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    systemLabel: {
        fontSize: 10,
        color: COLORS.cyan,
        letterSpacing: 3,
        marginBottom: 12,
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    title: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        textShadowColor: COLORS.cyan,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    buttonContainer: {
        marginTop: 20,
        gap: 15,
    },
    button: {
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    appleButton: {
        backgroundColor: COLORS.white,
    },
    googleButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.cyan,
    },
    guestButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.purple,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    appleText: {
        color: '#000000',
    },
    googleText: {
        color: COLORS.navy,
    },
    guestText: {
        color: COLORS.gray,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    dividerText: {
        color: COLORS.gray,
        marginHorizontal: 15,
        fontSize: 12,
    },
    guestNote: {
        color: COLORS.gray,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
        fontStyle: 'italic',
    },
});

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { COLORS } from '../constants/theme';

import { useStore } from '../store/useStore';

export const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { setGuest } = useStore();

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    async function signUpWithEmail() {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        if (!session) Alert.alert('Please check your inbox for email verification!');
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Initialize Agent</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    placeholderTextColor={COLORS.gray}
                    autoCapitalize={'none'}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor={COLORS.gray}
                    autoCapitalize={'none'}
                    style={styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.ghostButton]}
                    disabled={loading}
                    onPress={() => setGuest(true)}
                >
                    <Text style={[styles.buttonText, styles.ghostText]}>Continue as Guest</Text>
                </TouchableOpacity>
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
    title: {
        color: COLORS.cyan,
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: COLORS.gray,
        fontSize: 14,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: 'rgba(110, 44, 243, 0.1)',
        borderWidth: 1,
        borderColor: COLORS.purple,
        borderRadius: 12,
        padding: 16,
        color: COLORS.white,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        gap: 15,
    },
    button: {
        backgroundColor: COLORS.purple,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.pink,
    },
    ghostButton: {
        backgroundColor: 'transparent',
        marginTop: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    ghostText: {
        color: COLORS.gray,
        fontSize: 16,
        fontWeight: 'normal',
    },
});

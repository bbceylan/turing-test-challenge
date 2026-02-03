import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initDb } from './src/db/client';
import { useStore } from './src/store/useStore';
import { COLORS } from './src/constants/theme';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { BlurView } from 'expo-blur';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlayScreen } from './src/screens/PlayScreen';
import { LeaderboardScreen } from './src/screens/LeaderboardScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { MilestoneScreen } from './src/screens/MilestoneScreen';
import { Gamepad2, Trophy, User, Target } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

import { supabase } from './src/utils/supabase';
import { AuthScreen } from './src/screens/AuthScreen';

import { registerForPushNotificationsAsync, scheduleDailyReminder } from './src/utils/notifications';
import { loadInterstitial } from './src/utils/ads';

export default function App() {
  const { loadStats, isLoading, session, setSession } = useStore();
  const [setupError, setSetupError] = useState<Error | null>(null);

  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setup = async () => {
      try {
        // Critical: Database must initialize first
        await initDb();
        await loadStats();

        // Non-critical: These can fail silently
        try {
          registerForPushNotificationsAsync();
          scheduleDailyReminder();
          loadInterstitial();
        } catch (nonCriticalError) {
          if (__DEV__) {
            console.warn('Non-critical setup failed:', nonCriticalError);
          }
        }

        // Auth setup
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        // Store subscription for cleanup
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
        authSubscription = subscription;

      } catch (error) {
        if (__DEV__) {
          console.error('App setup failed:', error);
        }
        setSetupError(error instanceof Error ? error : new Error('Setup failed'));
        useStore.setState({ isLoading: false });
      }
    };

    setup();

    // Cleanup function
    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  // Error state UI
  if (setupError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Failed to Start</Text>
        <Text style={styles.errorText}>
          {__DEV__ ? setupError.message : 'Please restart the app'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setSetupError(null);
            useStore.setState({ isLoading: true });
          }}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!session && !useStore.getState().isGuest) {
    return (
      <ErrorBoundary>
        <AuthScreen />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: Platform.OS === 'ios' ? 'transparent' : COLORS.navy,
              borderTopColor: 'rgba(110, 44, 243, 0.3)',
              position: Platform.OS === 'ios' ? 'absolute' : 'relative',
              height: 85,
              paddingBottom: 25,
            },
            tabBarBackground: () => (
              Platform.OS === 'ios' ? (
                <BlurView
                  tint="dark"
                  intensity={30}
                  style={StyleSheet.absoluteFill}
                />
              ) : undefined
            ),
            tabBarActiveTintColor: COLORS.pink,
            tabBarInactiveTintColor: COLORS.gray,
          }}
        >
          <Tab.Screen
            name="Play"
            component={PlayScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Gamepad2 color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Leaderboard"
            component={LeaderboardScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Achieve"
            component={MilestoneScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Target color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
            }}
          />
        </Tab.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.cyan,
  },
  errorTitle: {
    color: COLORS.pink,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorText: {
    color: COLORS.gray,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  retryButton: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  retryText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

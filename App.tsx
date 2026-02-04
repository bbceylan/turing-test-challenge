import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AppState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initDb } from './src/db/client';
import { useStore } from './src/store/useStore';
import { COLORS } from './src/constants/theme';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { BlurView } from 'expo-blur';
import { QADebugOverlay } from './src/components/QADebugOverlay';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlayScreen } from './src/screens/PlayScreen';
import { LeaderboardScreen } from './src/screens/LeaderboardScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { MilestoneScreen } from './src/screens/MilestoneScreen';
import { Gamepad2, User, Target, BarChart3 } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

import { registerForPushNotificationsAsync, scheduleDailyReminder } from './src/utils/notifications';
import { initIap, restoreProPurchases } from './src/utils/iap';

export default function App() {
  const { loadStats, isLoading, setIsPro } = useStore();
  const [setupError, setSetupError] = useState<Error | null>(null);

  useEffect(() => {
    let appStateSubscription: { remove: () => void } | null = null;

    const refreshPro = async () => {
      const hasPro = await restoreProPurchases();
      if (hasPro) {
        setIsPro(true);
      }
    };

    const setup = async () => {
      try {
        // Critical: Database must initialize first
        await initDb();
        await loadStats();

        // IAP init + restore (silent)
        await initIap();
        await refreshPro();

        // Non-critical: These can fail silently
        try {
          registerForPushNotificationsAsync();
          scheduleDailyReminder();
        } catch (nonCriticalError) {
          if (__DEV__) {
            console.warn('Non-critical setup failed:', nonCriticalError);
          }
        }

      } catch (error) {
        if (__DEV__) {
          console.error('App setup failed:', error);
        }
        setSetupError(error instanceof Error ? error : new Error('Setup failed'));
        useStore.setState({ isLoading: false });
      }
    };

    appStateSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        refreshPro();
      }
    });

    setup();

    // Cleanup function
    return () => {
      appStateSubscription?.remove();
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

  return (
    <ErrorBoundary>
      {__DEV__ && <QADebugOverlay />}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'transparent',
              borderTopColor: 'rgba(110, 44, 243, 0.3)',
              position: 'absolute',
              height: 85,
              paddingBottom: 25,
            },
            tabBarBackground: () => (
              <BlurView
                tint="dark"
                intensity={30}
                style={StyleSheet.absoluteFill}
              />
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
            name="Local"
            component={LeaderboardScreen}
            options={{
              tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
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

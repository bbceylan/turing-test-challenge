import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initDb } from './src/db/client';
import { useStore } from './src/store/useStore';
import { COLORS } from './src/constants/theme';

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

export default function App() {
  const { loadStats, isLoading, session, setSession } = useStore();

  useEffect(() => {
    const setup = async () => {
      await initDb();
      await loadStats();

      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    };
    setup();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.navy,
            borderTopColor: 'rgba(110, 44, 243, 0.3)',
            height: 85,
            paddingBottom: 25,
          },
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.pink,
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingText: {
    color: COLORS.cyan,
  }
});

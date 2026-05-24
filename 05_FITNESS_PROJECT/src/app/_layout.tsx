import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';

import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import * as SQLite from 'expo-sqlite';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { dbName, getDB } from '@/db';
import { useWorkout } from '@/store';
import { useEffect } from 'react';

DarkTheme.colors.primary = Colors.dark.tint;
DefaultTheme.colors.primary = Colors.light.tint;

const db = SQLite.openDatabaseSync(dbName);

// remove letter
getDB();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useDrizzleStudio(db);

  const loadWorkouts = useWorkout(state => state.loadWorkout);

  useEffect(() => {
    loadWorkouts()
  },[])

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="workout/current" options={{ title: 'Workout' }} />
          <Stack.Screen name="workout/[id]" options={{ title: 'Workout' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

import { dbName, getDB } from '@/db';
import colors from '@/theme/colors';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import * as SQLite from 'expo-sqlite';
import { useColorScheme } from 'react-native';

DarkTheme.colors.primary = colors.dark.tint;
DefaultTheme.colors.primary = colors.light.tint;
const db = SQLite.openDatabaseSync(dbName);

// Remove letter
getDB();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useDrizzleStudio(db);
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pokemon-stats-modal"
          options={{
            presentation: 'formSheet',
            headerShown: false,
            sheetAllowedDetents: [0.3, 0.75, 1],
            sheetGrabberVisible: false,
            sheetCornerRadius: 24,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

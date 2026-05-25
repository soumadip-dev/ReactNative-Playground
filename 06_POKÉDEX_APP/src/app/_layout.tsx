import colors from '@/theme/colors';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import { useColorScheme } from 'react-native';

DarkTheme.colors.primary = colors.dark.tint;
DefaultTheme.colors.primary = colors.light.tint;

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

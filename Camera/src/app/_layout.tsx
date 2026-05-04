import { Slot, Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: 'lightgreen' }}>
      {/* <Slot /> */}
      {/* <Stack screenOptions={{ headerShown: false }} /> */}
      <Stack screenOptions={{ headerTintColor: 'blue' }}>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

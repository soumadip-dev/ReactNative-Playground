import { Stack } from 'expo-router';

export default function SqlLiteLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'SQLite Database' }} />
      <Stack.Screen name="create-user" options={{ title: 'Create User' }} />
      <Stack.Screen name="users-list" options={{ title: 'Users List' }} />
    </Stack>
  );
}

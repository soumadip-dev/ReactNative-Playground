import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f8fafc',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
          height: 90,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="Asyncstorage"
        options={{
          title: 'Async Storage',
          headerTitle: 'AsyncStorage Overview',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="database" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Securestorage"
        options={{
          title: 'Secure Store',
          headerTitle: 'SecureStore Vault',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shield" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Sqllite"
        options={{
          title: 'SQLite',
          headerTitle: 'SQLite Database',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="server" size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="camera-screen"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <FontAwesome name="camera" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="audio-screen"
        options={{
          title: 'Audio',
          tabBarIcon: ({ color }) => <FontAwesome name="microphone" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

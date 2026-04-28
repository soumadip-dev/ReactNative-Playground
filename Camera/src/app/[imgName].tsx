import { Link, useLocalSearchParams, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function ImageScreen() {
  const { imgName: name } = useLocalSearchParams<{ imgName: string }>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ title: 'Image' + ' : ' + name }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Image Screen for {name}</Text>
      <Link href="/" style={{ marginTop: 20, fontSize: 26, color: 'blue', fontWeight: 'bold' }}>
        Home
      </Link>
    </View>
  );
}

import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function CameraScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Camera Screen</Text>
      <Link href="/" style={{ marginTop: 20, fontSize: 26, color: 'blue', fontWeight: 'bold' }}>
        Home
      </Link>
    </View>
  );
}

import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Hello World</Text>
      <Link href={'/feed'}>Feed</Link>
      <Link href={'/explore'}>ExplorePage</Link>

      <Link href="/users/123/posts/456">View User 123's Post 456</Link>
    </View>
  );
}

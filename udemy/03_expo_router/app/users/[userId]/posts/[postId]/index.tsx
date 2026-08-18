import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function UserPostIdPage() {
  const { userId, postId } = useLocalSearchParams<{
    userId: string;
    postId: string;
  }>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Details</Text>
      <Text>User ID: {userId}</Text>
      <Text>Post ID: {postId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

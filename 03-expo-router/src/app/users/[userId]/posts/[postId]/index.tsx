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

      <View style={styles.infoBox}>
        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>{userId}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Post ID</Text>
        <Text style={styles.value}>{postId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  infoBox: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 3,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
});

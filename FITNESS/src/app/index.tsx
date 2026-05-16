import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>

        <Link href="/workout/current" style={styles.link}>
          Resume Current Workout
        </Link>

        <Link href="/workout/1" style={styles.link}>
          Workout 1
        </Link>

        <Link href="/workout/1" style={styles.link}>
          Workout 2
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    justifyContent: 'center',
  },
  main: {
    gap: 14,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    color: '#334155',
    marginBottom: 12,
    textAlign: 'center',
  },
  link: {
    fontSize: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    color: '#2563EB',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    textAlign: 'center',
  },
});

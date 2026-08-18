import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.subtitle}>Expo Router Playground</Text>

      <View style={styles.links}>
        {/* Nested routes */}
        <Link href="/profile/feed" style={styles.link}>
          Feed
        </Link>

        <Link href="/explore" style={styles.link}>
          Explore
        </Link>

        {/* Dynamic routes */}
        <Link href="/users/123/posts/456" style={styles.link}>
          User 123's Post 456
        </Link>

        {/* Catch all routes */}
        <Link href="/admin/users/logs" style={styles.link}>
          Admin Logs
        </Link>
        {/* Catch all routes */}
        <Link href="/admin/reports/monthly" style={styles.link}>
          Admin Monthly Reports
        </Link>

        <Link href="/login" style={[styles.link, styles.login]}>
          Login
        </Link>

        <Link href="/signUp" style={[styles.link, styles.signup]}>
          Sign Up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 25,
  },
  links: {
    width: '100%',
    maxWidth: 350,
    gap: 10,
  },
  link: {
    backgroundColor: '#FFFFFF',
    color: '#4F46E5',
    textAlign: 'center',
    padding: 13,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: '600',
    elevation: 2,
  },
  login: {
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    marginTop: 8,
  },
  signup: {
    backgroundColor: '#ECFDF5',
    color: '#059669',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Good evening</Text>
          <Text style={styles.title}>Welcome Home</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Have a great day!</Text>
        <Text style={styles.bannerText}>Keep learning and building something new.</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.number}>12</Text>
          <Text style={styles.label}>Tasks</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.number}>04</Text>
          <Text style={styles.label}>Projects</Text>
        </View>
      </View>

      <View style={styles.links}>
        <Text style={styles.sectionTitle}>Quick Links</Text>

        <Link href="/profile/feed" style={styles.link}>
          Feed
        </Link>

        <Link href="/explore" style={styles.link}>
          Explore
        </Link>

        <Link href="/users/123/posts/456" style={styles.link}>
          User 123's Post 456
        </Link>

        <Link href="/admin/users/logs" style={styles.link}>
          Admin Logs
        </Link>
        <Link href="/dashboard" style={styles.link}>
          Dashboard
        </Link>

        <Link href="/admin/reports/monthly" style={styles.link}>
          Admin Monthly Reports
        </Link>

        <View style={styles.authLinks}>
          <Link href="/login" style={[styles.authLink, styles.login]}>
            Login
          </Link>

          <Link href="/signUp" style={[styles.authLink, styles.signup]}>
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
  },
  smallText: {
    color: '#64748B',
    fontSize: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  banner: {
    backgroundColor: '#7C3AED',
    padding: 22,
    borderRadius: 18,
    marginTop: 30,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  bannerText: {
    color: '#EDE9FE',
    marginTop: 8,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 18,
  },
  box: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },
  number: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7C3AED',
  },
  label: {
    color: '#64748B',
    marginTop: 4,
  },
  links: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  link: {
    backgroundColor: '#FFFFFF',
    color: '#4F46E5',
    textAlign: 'center',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    elevation: 1,
  },
  authLinks: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  authLink: {
    flex: 1,
    textAlign: 'center',
    padding: 13,
    borderRadius: 10,
    fontWeight: '700',
  },
  login: {
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
  },
  signup: {
    backgroundColor: '#ECFDF5',
    color: '#059669',
  },
});

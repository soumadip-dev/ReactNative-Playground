import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Linking Tools</Text>
      <Text style={styles.subtitle}>Select an option below to test linking capabilities:</Text>

      <View style={styles.buttonContainer}>
        <Link href="/expo-linking/basic-linking" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Basic Linking</Text>
            <Text style={styles.cardDescription}>
              Open external URLs, send SMS messages, and launch native map directions.
            </Text>
          </Pressable>
        </Link>

        <Link href="/expo-linking/deep-linking" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Deep Linking</Text>
            <Text style={styles.cardDescription}>
              Handle custom schemes and navigate directly to specific screens via URLs.
            </Text>
          </Pressable>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});

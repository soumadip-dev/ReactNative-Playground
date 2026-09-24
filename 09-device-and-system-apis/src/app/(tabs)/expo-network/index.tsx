import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Status Tools</Text>
      <Text style={styles.subtitle}>Select an option below to test connection state:</Text>

      <View style={styles.buttonContainer}>
        <Link href="/expo-network/basic-network-check" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Basic Network Check</Text>
            <Text style={styles.cardDescription}>
              Check status on demand using a refresh button.
            </Text>
          </Pressable>
        </Link>

        <Link href="/expo-network/network-listener" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Live Network Listener</Text>
            <Text style={styles.cardDescription}>
              Real-time updates when toggling Wi-Fi or Airplane Mode.
            </Text>
          </Pressable>
        </Link>

        <Link href="/expo-network/network-details" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Network Details</Text>
            <Text style={styles.cardDescription}>
              View IP address, reachability, and detailed connection state.
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
  },
});

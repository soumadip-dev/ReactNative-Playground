import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { createTable } from '@/db/createTable';
import { Link } from 'expo-router';

const Sqllite = () => {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Local Database</Text>
      <Text style={styles.title}>SQLite Overview</Text>
      <Text style={styles.subtitle}>Manage your local user records</Text>

      <View style={styles.buttonContainer}>
        <Link href="/Sqllite/users-list" style={styles.button}>
          <Text style={styles.buttonIcon}>👥</Text>
          <Text style={styles.buttonText}>Users List</Text>
        </Link>
        <Link href="/Sqllite/create-user" style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonIcon}>➕</Text>
          <Text style={styles.buttonText}>Create User</Text>
        </Link>
      </View>
    </View>
  );
};

export default Sqllite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },
  eyebrow: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#38bdf8',
    marginBottom: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    textAlign: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: '#0891b2',
    shadowColor: '#0891b2',
  },
  buttonIcon: {
    fontSize: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

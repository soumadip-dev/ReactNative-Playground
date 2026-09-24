import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Network from 'expo-network';

export default function BasicNetworkCheck() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [networkType, setNetworkType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const checkNetwork = async () => {
    setLoading(true);
    try {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected ?? false);
      setNetworkType(networkState.type ?? 'UNKNOWN');
    } catch (error) {
      console.error('Error fetching network state:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Basic Network Check</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
        ) : (
          <View style={styles.infoGroup}>
            <View style={styles.statusRow}>
              <Text style={styles.label}>Status:</Text>
              <Text style={[styles.statusValue, { color: isConnected ? '#16A34A' : '#DC2626' }]}>
                {isConnected ? 'Connected ✅' : 'Disconnected ❌'}
              </Text>
            </View>

            <View style={styles.statusRow}>
              <Text style={styles.label}>Type:</Text>
              <Text style={styles.typeValue}>{networkType}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={checkNetwork} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Refresh Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  infoGroup: {
    width: '100%',
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  label: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  typeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

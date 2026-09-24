import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Network from 'expo-network';

export default function NetworkListener() {
  const [status, setStatus] = useState<string>('Checking...');
  const [connectionType, setConnectionType] = useState<string>('Unknown');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const getTypeName = (type: Network.NetworkStateType | undefined) => {
    switch (type) {
      case Network.NetworkStateType.WIFI:
        return 'Wi-Fi';
      case Network.NetworkStateType.CELLULAR:
        return 'Cellular Data';
      case Network.NetworkStateType.ETHERNET:
        return 'Ethernet';
      case Network.NetworkStateType.NONE:
        return 'No Connection';
      default:
        return 'Unknown';
    }
  };

  const checkInitialState = async () => {
    const state = await Network.getNetworkStateAsync();
    setIsOnline(!!state.isConnected);
    setStatus(state.isConnected ? 'Online 🟢' : 'Offline 🔴');
    setConnectionType(getTypeName(state.type));
  };

  useEffect(() => {
    // 1. Fetch initial status on mount
    checkInitialState();

    // 2. Subscribe to network state changes
    const subscription = Network.addNetworkStateListener(state => {
      console.log('Network changed:', state);
      setIsOnline(!!state.isConnected);
      setStatus(state.isConnected ? 'Online 🟢' : 'Offline 🔴');
      setConnectionType(getTypeName(state.type));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderColor: isOnline ? '#22C55E' : '#EF4444' }]}>
        <Text style={styles.badgeText}>Real-Time Monitor</Text>

        <Text style={[styles.statusText, { color: isOnline ? '#15803D' : '#B91C1C' }]}>
          {status}
        </Text>

        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>Connection Type:</Text>
          <Text style={styles.typeValue}>{connectionType}</Text>
        </View>

        <View style={styles.hintBox}>
          <Text style={styles.hintText}>
            💡 Try toggling your Wi-Fi or Airplane Mode to test real-time listener updates.
          </Text>
        </View>
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
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  typeLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  typeValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  hintBox: {
    marginTop: 16,
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 8,
  },
  hintText: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
  },
});

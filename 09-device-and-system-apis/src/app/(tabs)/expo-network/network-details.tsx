import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Network from 'expo-network';

// Define explicit TypeScript interface for network info state
interface NetworkInfoState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  ipAddress: string | null;
  loading: boolean;
}

const NetworkDetails = () => {
  // Fix 1: Properly pass type parameter to useState
  const [networkInfo, setNetworkInfo] = useState<NetworkInfoState>({
    isConnected: false,
    isInternetReachable: null,
    ipAddress: null,
    loading: true,
  });

  const fetchNetworkDetails = async () => {
    try {
      // Get network state
      const state = await Network.getNetworkStateAsync();

      // Get IP address if connected
      let ip: string | null = null;
      if (state.isConnected) {
        ip = await Network.getIpAddressAsync();
      }

      setNetworkInfo({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable ?? null,
        ipAddress: ip,
        loading: false,
      });
    } catch (error) {
      console.error('Error:', error);
      // Fix 2: Explicitly type 'prev' parameter in state updater
      setNetworkInfo((prev: NetworkInfoState) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchNetworkDetails();
  }, []);

  // Loading Screen
  if (networkInfo.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Main UI Screen
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Network Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Connected:</Text>
          <Text style={[styles.value, { color: networkInfo.isConnected ? '#16A34A' : '#DC2626' }]}>
            {networkInfo.isConnected ? 'Yes ✅' : 'No ❌'}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Internet Reachable:</Text>
          <Text style={styles.value}>
            {networkInfo.isInternetReachable === null
              ? 'Unknown'
              : networkInfo.isInternetReachable
                ? 'Yes 🌐'
                : 'No 🚫'}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>IP Address:</Text>
          <Text style={styles.value}>{networkInfo.ipAddress || 'N/A'}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={fetchNetworkDetails}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NetworkDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
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
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

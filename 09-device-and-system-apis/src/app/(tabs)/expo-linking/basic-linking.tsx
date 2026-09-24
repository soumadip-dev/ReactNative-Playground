import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import * as Linking from 'expo-linking';

const BasicLinking = () => {
  async function openWebsite() {
    const url = 'https://soumadip.vercel.app/';

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open this URL on your device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while opening the link.');
    }
  }

  async function sendSMS() {
    const phoneNumber = '+918101466811';
    const message = 'Hello from my app!';

    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${phoneNumber}${separator}body=${encodeURIComponent(message)}`;

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'SMS service is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while trying to send SMS.');
    }
  }

  const openMaps = async () => {
    const address = '1600 Amphitheatre Parkway, Mountain View, CA';
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;

    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open maps on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while opening maps.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Linking Examples</Text>
        <Text style={styles.description}>
          Tap a button below to test external URL opening and native device actions using Expo
          Linking.
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={openWebsite}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>🌐 Open Website</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={sendSMS}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>💬 Send SMS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={openMaps}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>📍 Open Maps</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasicLinking;

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
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },
});

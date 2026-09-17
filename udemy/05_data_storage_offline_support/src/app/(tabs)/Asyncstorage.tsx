import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const STORAGE_KEY = 'username';
const USERNAME = 'soumadip';

export default function Asyncstorage() {
  const [output, setOutput] = useState('');

  const addLog = (message: string) => {
    setOutput(prev => (prev ? `${prev}\n> ${message}` : `> ${message}`));
  };

  const clearLogs = () => {
    setOutput('');
  };

  const saveUsername = async () => {
    try {
      clearLogs();

      await AsyncStorage.setItem(STORAGE_KEY, USERNAME);

      addLog(`Saved: ${STORAGE_KEY} = ${USERNAME}`);
    } catch (error) {
      addLog('Failed to save username');
      console.error(error);
      Alert.alert('Error', 'Failed to save username');
    }
  };

  const getUsername = async () => {
    try {
      clearLogs();

      const storedUsername = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedUsername === null) {
        addLog(`No value found for: ${STORAGE_KEY}`);
        return;
      }

      addLog(`Loaded: ${STORAGE_KEY} = ${storedUsername}`);
    } catch (error) {
      addLog('Failed to load username');
      console.error(error);
      Alert.alert('Error', 'Failed to load username');
    }
  };

  const removeUsername = async () => {
    try {
      clearLogs();

      await AsyncStorage.removeItem(STORAGE_KEY);

      addLog(`Removed: ${STORAGE_KEY}`);
    } catch (error) {
      addLog('Failed to remove username');
      console.error(error);
      Alert.alert('Error', 'Failed to remove username');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Example</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={saveUsername}
        >
          <Text style={styles.buttonText}>Save Username</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={getUsername}
        >
          <Text style={styles.buttonText}>Get Username</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonDanger,
            pressed && styles.buttonPressed,
          ]}
          onPress={removeUsername}
        >
          <Text style={styles.buttonText}>Remove Username</Text>
        </Pressable>
      </View>

      <View style={styles.outputContainer}>
        <View style={styles.terminalHeader}>
          <View style={[styles.dot, styles.dotRed]} />
          <View style={[styles.dot, styles.dotYellow]} />
          <View style={[styles.dot, styles.dotGreen]} />
          <Text style={styles.outputTitle}>terminal.log</Text>
        </View>

        <ScrollView style={styles.outputScroll} contentContainerStyle={styles.outputContent}>
          <Text style={styles.outputText}>{output || '> Waiting for action...'}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0f172a',
  },

  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#f8fafc',
  },

  buttonContainer: {
    width: '100%',
    gap: 12,
  },

  button: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },

  buttonDanger: {
    backgroundColor: '#dc2626',
  },

  buttonPressed: {
    opacity: 0.8,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  outputContainer: {
    width: '100%',
    maxHeight: 220,
    marginTop: 28,
    borderRadius: 8,
    backgroundColor: '#030712',
    borderWidth: 1,
    borderColor: '#1e293b',
    overflow: 'hidden',
  },

  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  dotRed: { backgroundColor: '#ef4444' },
  dotYellow: { backgroundColor: '#f59e0b' },
  dotGreen: { backgroundColor: '#10b981' },

  outputTitle: {
    fontSize: 12,
    fontFamily: 'Courier',
    color: '#64748b',
    marginLeft: 6,
  },

  outputScroll: {
    maxHeight: 150,
    padding: 12,
  },

  outputContent: {
    paddingBottom: 8,
  },

  outputText: {
    color: '#22c55e',
    fontSize: 13,
    fontFamily: 'Courier',
    lineHeight: 20,
  },
});

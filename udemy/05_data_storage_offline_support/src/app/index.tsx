import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const STORAGE_KEY = 'username';
const USERNAME = 'soumadip';

export default function Index() {
  const [output, setOutput] = useState('');

  const addLog = (message: string) => {
    setOutput(prev => (prev ? `${prev}\n${message}` : message));
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
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={removeUsername}
        >
          <Text style={styles.buttonText}>Remove Username</Text>
        </Pressable>
      </View>

      <View style={styles.outputContainer}>
        <Text style={styles.outputTitle}>Output</Text>

        <ScrollView style={styles.outputScroll} contentContainerStyle={styles.outputContent}>
          <Text style={styles.outputText}>{output || 'No output yet...'}</Text>
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
    backgroundColor: '#f5f5f5',
  },

  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },

  buttonContainer: {
    width: '100%',
    gap: 10,
  },

  button: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#222',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  outputContainer: {
    width: '100%',
    maxHeight: 200,
    marginTop: 24,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  outputTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
  },

  outputScroll: {
    maxHeight: 140,
  },

  outputContent: {
    paddingBottom: 4,
  },

  outputText: {
    fontSize: 14,
    lineHeight: 22,
  },
});

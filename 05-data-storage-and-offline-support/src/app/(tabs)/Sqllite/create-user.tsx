import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { insertUser } from '@/db/crud';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const handleCreateUser = async () => {
    try {
      await insertUser(name, email);
      router.push('/Sqllite/users-list');
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setName('');
      setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create New User</Text>
        <Text style={styles.subtitle}>Fill in the details below</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.createButton, pressed && styles.buttonPressed]}
          onPress={handleCreateUser}
        >
          <Text style={styles.createButtonText}>Create User</Text>
        </Pressable>
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
  form: {
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: -12,
    marginBottom: 4,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e2e8f0',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#334155',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#020617',
    color: '#f8fafc',
  },
  createButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    marginTop: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.75,
  },
});

import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✨</Text>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us and get started</Text>

      <View style={styles.form}>
        <TextInput placeholder="Full Name" placeholderTextColor="#94A3B8" style={styles.input} />

        <TextInput placeholder="Email" placeholderTextColor="#94A3B8" style={styles.input} />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 42,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#065F46',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 6,
    marginBottom: 25,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    elevation: 3,
  },
  input: {
    backgroundColor: '#F1F5F9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    color: '#0F172A',
  },
  button: {
    backgroundColor: '#059669',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

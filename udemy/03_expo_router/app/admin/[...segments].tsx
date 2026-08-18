import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const AdminCatchAll = () => {
  const { segments } = useLocalSearchParams<{ segments: string[] }>();

  const pathDisplay = segments.join('/');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.title}>Admin Page</Text>
        <Text style={styles.pathLabel}>Current Path</Text>
        <Text style={styles.pathText}>{pathDisplay}</Text>
      </View>
    </View>
  );
};

export default AdminCatchAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  card: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 2,
  },
  icon: {
    fontSize: 30,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  pathLabel: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 18,
  },
  pathText: {
    fontSize: 16,
    marginTop: 6,
    color: '#4F46E5',
    fontWeight: '600',
  },
});

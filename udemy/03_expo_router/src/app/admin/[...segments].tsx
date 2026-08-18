import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const AdminCatchAll = () => {
  const { segments } = useLocalSearchParams<{ segments: string[] }>();

  const pathDisplay = segments.join('/');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Page</Text>
      <Text style={styles.pathText}>Path: {pathDisplay}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pathText: {
    fontSize: 16,
    marginTop: 10,
    color: '#999',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ExplorePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔎</Text>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.subtitle}>Discover something new today.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Featured</Text>
        <Text style={styles.cardText}>Explore new content, projects, and ideas.</Text>
      </View>
    </View>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 42,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0C4A6E',
  },
  subtitle: {
    color: '#64748B',
    marginTop: 6,
    marginBottom: 25,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0284C7',
  },
  cardText: {
    color: '#64748B',
    marginTop: 6,
    lineHeight: 20,
  },
});

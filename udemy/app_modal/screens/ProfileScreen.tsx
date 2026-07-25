import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});

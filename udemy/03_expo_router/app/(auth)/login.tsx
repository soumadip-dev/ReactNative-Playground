import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>login</Text>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

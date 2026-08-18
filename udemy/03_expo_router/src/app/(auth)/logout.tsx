import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const logout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>logout</Text>
    </View>
  );
};

export default logout;

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

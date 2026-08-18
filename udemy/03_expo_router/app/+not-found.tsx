import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Not Found</Text>
    </View>
  );
};

export default NotFound;

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

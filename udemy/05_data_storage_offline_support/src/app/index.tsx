import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Asyncstorage from './(tabs)/Asyncstorage';
import Securestorage from './(tabs)/Securestorage';

const index = () => {
  return (
    <View style={styles.container}>
      {/* <Asyncstorage /> */}
      <Securestorage />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const AnswerOption = () => {
  return (
    <View style={styles.containner}>
      <Text>This is an Answer Option</Text>
    </View>
  );
};

export default AnswerOption;

const styles = StyleSheet.create({
  containner: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 20,
    borderRadius: 100,
  },
});

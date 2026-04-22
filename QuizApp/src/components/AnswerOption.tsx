import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

type AnswerOptionProps = {
  option: string;
  isSelected?: boolean;
  onPress: () => void;
};

const AnswerOption = ({ option, isSelected, onPress }: AnswerOptionProps) => {
  return (
    <Pressable
      style={[
        styles.containner,
        isSelected && {
          backgroundColor: '#E1F396',
          borderColor: '#E1F396',
        },
      ]}
      onPress={onPress}
    >
      <Text>{option}</Text>
    </Pressable>
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

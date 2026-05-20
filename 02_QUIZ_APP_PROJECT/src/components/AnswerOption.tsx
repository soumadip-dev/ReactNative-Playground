import { Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useQuizContext } from '../context';

type AnswerOptionProps = {
  option: string;
};

const AnswerOption = ({ option }: AnswerOptionProps) => {
  const { selectedOption, setSelectedOption } = useQuizContext();

  const isSelected = option === selectedOption;

  return (
    <Pressable
      style={[
        styles.containner,
        isSelected && {
          backgroundColor: '#E1F396',
          borderColor: '#E1F396',
        },
      ]}
      onPress={() => setSelectedOption(option)}
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

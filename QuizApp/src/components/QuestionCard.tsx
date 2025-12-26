import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AnswerOption from './AnswerOption';
import { Question } from '../types';
import Card from './Card';

type QuestionCardProps = {
  question: Question;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handlePress = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Card title={question?.title}>
      <View style={styles.optionsContainer}>
        {question.options.map(option => (
          <AnswerOption
            key={option}
            option={option}
            onPress={() => handlePress(option)}
            isSelected={selectedOption?.toString() === option?.toString()}
          />
        ))}
      </View>
    </Card>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  optionsContainer: {
    gap: 12,
  },
});

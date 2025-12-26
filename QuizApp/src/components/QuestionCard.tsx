import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AnswerOption from './AnswerOption';
import { Question } from '../types';

type QuestionCardProps = {
  question: Question;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handlePress = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>{question?.title}</Text>

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
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 24,
    gap: 28,
    shadowColor: '#005055',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  question: {
    fontSize: 26,
    fontWeight: '600',
    color: '#005055',
    lineHeight: 34,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
});

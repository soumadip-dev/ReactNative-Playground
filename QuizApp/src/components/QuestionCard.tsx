import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AnswerOption from './AnswerOption';
import { question } from '../types';

interface QuestionCardProps {
  question: question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const selectedOption = question.options[0];

  const onOptionSelected = (option: string) => {
    console.warn('Selected: ', option);
  };

  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>{question.title}</Text>

      <View style={{ gap: 10 }}>
        {question.options.map(option => (
          <AnswerOption
            key={option}
            option={option}
            isSelected={option === selectedOption}
            onPress={() => onOptionSelected(option)}
          />
        ))}
      </View>
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
  },
  question: {
    fontSize: 24,
    fontWeight: '500',
  },
});

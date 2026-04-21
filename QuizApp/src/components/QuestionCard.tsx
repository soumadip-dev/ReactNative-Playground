import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AnswerOption from './AnswerOption';

const QuestionCard = () => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.question}>What is React Native ?</Text>

      <View style={{ gap: 10 }}>
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
        <AnswerOption />
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

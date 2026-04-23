import { View } from 'react-native';
import AnswerOption from './AnswerOption';
import { question } from '../types';
import Card from './Card';
import { useState } from 'react';
import { useQuizContext } from '../context';

interface QuestionCardProps {
  question: question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const { selectedOption, setSelectedOption } = useQuizContext();

  const onOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Card title={question.title}>
      <View style={{ gap: 10 }}>
        {question.options.map(option => (
          <AnswerOption
            key={option}
            option={option}

          />
        ))}
      </View>
    </Card>
  );
};

export default QuestionCard;

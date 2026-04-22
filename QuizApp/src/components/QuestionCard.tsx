import { View } from 'react-native';
import AnswerOption from './AnswerOption';
import { question } from '../types';
import Card from './Card';

interface QuestionCardProps {
  question: question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const selectedOption = question.options[0];

  const onOptionSelected = (option: string) => {
    console.warn('Selected: ', option);
  };

  return (
    <Card title={question.title}>
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
    </Card>
  );
};

export default QuestionCard;

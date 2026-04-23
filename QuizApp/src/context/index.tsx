import { createContext, PropsWithChildren, useContext, useState } from 'react';
import questions from '../questions';
import { question } from '../types';

type QuizContext = {
  question?: question;
  questionIndex: number;
  moveNextQuestion: () => void;
  selectedOption?: string;
  setSelectedOption: (newOption: string) => void;
  score: number;
  numberOfQuestions: number;
};

const QuizContext = createContext<QuizContext>({
  questionIndex: 0,
  moveNextQuestion: () => {},
  setSelectedOption: () => {},
  score: 0,
  numberOfQuestions: 0,
});

export default function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const isFinished = questionIndex >= questions.length;

  const reStart = () => {
    setQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
  };

  const moveNextQuestion = () => {
    if (isFinished) {
      reStart();
      return;
    }
    if (selectedOption === question?.correctAnswer) {
      setScore(score => score + 1);
    }
    setQuestionIndex(questionIndex => questionIndex + 1);
  };

  return (
    <QuizContext.Provider
      value={{
        question,
        questionIndex,
        moveNextQuestion,
        selectedOption,
        setSelectedOption,
        score,
        numberOfQuestions: questions.length,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => useContext(QuizContext);

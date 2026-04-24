import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
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
  bestScore: number;
};

const QuizContext = createContext<QuizContext>({
  questionIndex: 0,
  moveNextQuestion: () => {},
  setSelectedOption: () => {},
  score: 0,
  numberOfQuestions: 0,
  bestScore: 0,
});

export default function QuizProvider({ children }: PropsWithChildren) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [bestScore, setBestScore] = useState(0);
  const [score, setScore] = useState(0);
  const isFinished = questionIndex >= questions.length;

  useEffect(() => {
    // Check if there is a new best score
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [isFinished]);

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
        bestScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => useContext(QuizContext);

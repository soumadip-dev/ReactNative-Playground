import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import questions from '../questions';
import { question } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    loadBestScore();
  }, []);

  useEffect(() => {
    // Check if there is a new best score
    if (isFinished === true && score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [isFinished]);

  //* Function to restart the game
  const reStart = () => {
    setQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
  };

  //* Function to move to the next question
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

  //* Function to save the best score using AsyncStorage
  const saveBestScore = async (score: number) => {
    try {
      await AsyncStorage.setItem('best-score', score.toString());
    } catch (error) {
      console.error('Error saving best score:', error);
    }
  };

  const loadBestScore = async () => {
    try {
      const value = await AsyncStorage.getItem('best-score');
      if (value !== null) {
        setBestScore(parseInt(value));
      }
    } catch (error) {
      console.error('Error loading best score', error);
    }
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

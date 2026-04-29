import { WorkoutWithExercises } from '@/types/models';
import { getExerciseTotalWeight } from '@/services/exerciseService';
import * as Crypto from 'expo-crypto';

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce((total, exercise) => total + getExerciseTotalWeight(exercise), 0);
};

export const newWorkout = () => {
  const newWorkout: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  return newWorkout;
};


export const finishedWorkout = (workout: WorkoutWithExercises) => {
  return {
    ...workout,
    finishedAt: new Date(),
  }
}
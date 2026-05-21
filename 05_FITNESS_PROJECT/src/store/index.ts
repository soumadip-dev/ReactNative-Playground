import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import { finishedWorkout, newWorkout } from '@/services/workoutService';
import { createExercise } from '@/services/exerciseService';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finshWorkout: () => void;
  addExercise: (name: string) => void;
};

export const useWorkout = create<State & Actions>()((set, get) => ({
  currentWorkout: null,
  workouts: [],

  startWorkout: () => {
    set({
      currentWorkout: newWorkout(),
    });
  },

  finshWorkout: () => {
    const { currentWorkout } = get();

    if (!currentWorkout) return;

    set(state => ({
      currentWorkout: null,
      workouts: [finishedWorkout(currentWorkout), ...state.workouts],
    }));
  },

  addExercise: (name: string) => {
    const { currentWorkout } = get();

    if (!currentWorkout) {
      return;
    }
    const newExercise = createExercise(name, currentWorkout.id);

    set(state => ({
      currentWorkout: state.currentWorkout && {
        ...state.currentWorkout,
        exercises: [...state.currentWorkout?.exercises, newExercise],
      },
    }));
  },
}));

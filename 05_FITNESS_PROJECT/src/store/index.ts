import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import { finishedWorkout, newWorkout } from '@/services/workoutService';
import { createExercise } from '@/services/exerciseService';
import { immer } from 'zustand/middleware/immer';
import { createSet } from '@/services/setService';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finshWorkout: () => void;
  addExercise: (name: string) => void;
  addSet: (exerciseId: string) => void;
};

export const useWorkout = create<State & Actions>()(
  immer((set, get) => ({
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

      set(state => {
        state.currentWorkout = null;
        state.workouts.unshift(finishedWorkout(currentWorkout));
      });
    },

    addExercise: (name: string) => {
      const { currentWorkout } = get();

      if (!currentWorkout) {
        return;
      }
      const newExercise = createExercise(name, currentWorkout.id);

      // set(state => ({
      //   currentWorkout: state.currentWorkout && {
      //     ...state.currentWorkout,
      //     exercises: [...state.currentWorkout?.exercises, newExercise],
      //   },
      // }));

      //* Using immer
      set(state => {
        state.currentWorkout!.exercises.push(newExercise);
      });
    },

    addSet: (exerciseId: string) => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find(ex => ex.id === exerciseId);

        exercise?.sets?.push(newSet);
      });
    },
  }))
);

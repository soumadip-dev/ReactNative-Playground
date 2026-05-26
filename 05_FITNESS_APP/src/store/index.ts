import { ExerciseSet, ExerciseWithSets, WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import {
  finishedWorkout,
  getCurrentWorkoutWithExercises,
  getWorkoutsWithExercises,
  newWorkout,
} from '@/services/workoutService';
import { createExercise } from '@/services/exerciseService';
import { immer } from 'zustand/middleware/immer';
import { createSet, updateSet } from '@/services/setService';
import { current } from 'immer';
import { getCurrentWorkout } from '@/db/wokrouts';
import { deleteSet } from '@/db/sets';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  loadWorkout: () => void;
  startWorkout: () => void;
  finshWorkout: () => void;
  addExercise: (name: string) => void;
  addSet: (exerciseId: string) => void;
  updateSet: (setId: string, updatedField: Pick<ExerciseSet, 'reps' | 'weight'>) => void;
  deleteSet: (setId: string) => void;
};

export const useWorkout = create<State & Actions>()(
  immer((set, get) => ({
    currentWorkout: null,
    workouts: [],

    loadWorkout: async () => {
      const currentworkout = await getCurrentWorkout();

      set({
        currentWorkout: await getCurrentWorkoutWithExercises(),
        workouts: await getWorkoutsWithExercises(),
      });
    },

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

    addExercise: name => {
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

    addSet: exerciseId => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find(ex => ex.id === exerciseId);

        exercise?.sets?.push(newSet);
      });
    },

    updateSet: (setId, updatedField) => {
      set(({ currentWorkout }) => {
        const exercises = currentWorkout?.exercises.find(exercise =>
          exercise.sets.some(set => set.id === setId)
        );

        const setIndex = exercises?.sets.findIndex(set => set.id === setId);

        if (!exercises || setIndex === undefined || setIndex < 0) return;

        const updatedSet = updateSet(current(exercises.sets[setIndex]), updatedField);

        exercises.sets[setIndex] = updatedSet;
      });
    },
    deleteSet: setId => {
      deleteSet(setId);
      set(({ currentWorkout }) => {
        if (!currentWorkout) return;
        const exercises = currentWorkout?.exercises.find(exercise =>
          exercise.sets.some(set => set.id === setId)
        );
        if (!exercises) return;
        exercises.sets = exercises?.sets.filter(set => set.id !== setId);

        if (exercises.sets.length === 0) {
          currentWorkout.exercises = currentWorkout.exercises.filter(ex => ex.id !== exercises.id);
        }
      });
    },
  }))
);

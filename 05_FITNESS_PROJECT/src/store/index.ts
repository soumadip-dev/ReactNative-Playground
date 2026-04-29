import { WorkoutWithExercises } from '@/types/models';
import { create } from 'zustand';
import { finishedWorkout, newWorkout } from '@/services/workoutService';

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finshWorkout: () => void;
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
}));

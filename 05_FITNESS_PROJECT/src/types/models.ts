export type Workout = {
  id: string;
  createdAt: Date;
  finishedAt: Date | null;
};

export type Exercise = {
  id: string;
  workoutId: string;
  name: string;
};

export type ExerciseSet = {
  id: string;
  exerciseId: string;
  reps?: number | null;
  weight?: number | null;
  oneRM?: number | null;
};

// additional nested types
export type WorkoutWithExercises = Workout & {
  exercises: ExerciseWithSets[];
};

export type ExerciseWithSets = Exercise & {
  sets: ExerciseSet[];
};

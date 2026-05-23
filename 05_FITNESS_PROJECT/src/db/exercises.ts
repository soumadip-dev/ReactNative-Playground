import { Exercise } from '@/types/models';
import { getDB } from '.';
import { DbExercise } from '@/types/db';

//* Parse an exercise record from the database to an Exercise object
function parseExercise(exercise: DbExercise): Exercise {
  return {
    id: exercise.id,
    workoutId: exercise.workout_id,
    name: exercise.name,
  };
}

//* Save an exercise record to the database
async function saveExercise(exercise: Exercise) {
  try {
    const db = await getDB();
    await db.runAsync(
      'INSERT INTO exercises(id, workout_id, name) VALUES(?, ?, ?)',
      exercise.id,
      exercise.workoutId,
      exercise.name
    );
  } catch (error) {
    console.error('Error in saveExercise:', error);
  }
}

//* Retrieve all exercises from the database
async function getExercises(workout_id: string): Promise<Exercise[]> {
  try {
    const db = await getDB();

    const exercises = await db.getAllAsync<DbExercise>(
      `SELECT * FROM exercises WHERE workout_id = ?`,
      workout_id
    );
    console.log(exercises);

    return exercises.map(parseExercise);
  } catch (error) {
    console.error('Error in getExercises:', error);
    return [];
  }
}

//* Delete an exercise record from the database
async function deleteExercise(id: string) {
  try {
    const db = await getDB();

    await db.runAsync('DELETE FROM exercises WHERE id=?', id);
  } catch (error) {
    console.error('Error in deleteExercise:', error);
  }
}

export { saveExercise, getExercises, deleteExercise };

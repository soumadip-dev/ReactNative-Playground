import { ExerciseSet } from '@/types/models';
import { getDB } from '.';
import { DbExerciseSet } from '@/types/db';

//* Save a set record to the database
async function saveSet(exerciseSet: ExerciseSet) {
  try {
    const db = await getDB();

    await db.runAsync(
      'INSERT OR REPLACE INTO sets(id, exercise_id, reps, weight, one_rm) VALUES(?, ?, ?, ?, ?)',
      exerciseSet.id,
      exerciseSet.exerciseId,
      exerciseSet.reps ?? null,
      exerciseSet.weight ?? null,
      exerciseSet.oneRM ?? null
    );
  } catch (error) {
    console.error('Error in saveSet:', error);
  }
}

//* Parse a set record from the database to a Set object
function parseSet(exerciseSet: DbExerciseSet): ExerciseSet {
  return {
    id: exerciseSet.id,
    exerciseId: exerciseSet.exercise_id,
    reps: exerciseSet.reps,
    weight: exerciseSet.weight,
    oneRM: exerciseSet.one_rm,
  };
}

//* Retrieve all sets from the database
async function getSets(exerciseId: string): Promise<ExerciseSet[]> {
  try {
    const db = await getDB();

    const sets = await db.getAllSync<DbExerciseSet>(
      `SELECT * from sets WHERE exercise_id = ?`,
      exerciseId
    );

    return sets.map(parseSet);
  } catch (error) {
    console.error('Error in getSets:', error);
    return [];
  }
}

//* Delete a set record from the database
async function deleteSet(id: string) {
  try {
    const db = await getDB();
    await db.runAsync('DELETE FROM sets WHERE id=?', id);
  } catch (error) {
    console.log('Error in deleteSet:', error);
  }
}

export { saveSet, getSets, deleteSet };

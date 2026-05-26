import { Workout } from '@/types/models';
import { getDB } from '.';
import { DbWorkout } from '@/types/db';

//* Save a workout record to the database
async function saveWorkout(workout: Workout) {
  try {
    const db = await getDB();

    await db.runAsync(
      'INSERT OR REPLACE INTO workouts (id, created_at, finished_at) VALUES (?, ?, ?);',
      workout.id,
      workout.createdAt.toISOString(),
      workout.finishedAt?.toISOString() || null
    );
  } catch (error) {
    console.error('Error in saveWorkout:', error);
  }
}

//* Convert database workout data into application workout format
function parseWorkout(workout: DbWorkout): Workout {
  return {
    id: workout.id,
    createdAt: new Date(workout.created_at),
    finishedAt: workout.finished_at ? new Date(workout.finished_at) : null,
  };
}

//* Retrieve the latest unfinished workout from the database
async function getCurrentWorkout(): Promise<Workout | null> {
  try {
    const db = await getDB();

    const workout = await db.getFirstAsync<DbWorkout>(`
      SELECT * FROM workouts
      WHERE finished_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
    `);
    if (!workout) {
      return null;
    }
    return parseWorkout(workout);
  } catch (error) {
    console.error('Error in getCurrentWorkout:', error);
    return null;
  }
}

//* Retrieve all finished workouts from the database
async function getWorkouts(): Promise<Workout[]> {
  try {
    const db = await getDB();

    const workout = await db.getAllAsync<DbWorkout>(`
      SELECT * FROM workouts
      WHERE finished_at IS NOT NULL
      ORDER BY created_at DESC
      `);

    return workout.map(parseWorkout);
  } catch (error) {
    console.error('Error in getWorkouts:', error);
    return [];
  }
}

export { saveWorkout, getCurrentWorkout, getWorkouts };

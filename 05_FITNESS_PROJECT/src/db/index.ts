import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;
export const dbName = 'workout';

//* SQL queriy to create the workouts table
const createWorkoutsTableQuery = `
  CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY, 
    created_at TEXT, 
    finished_at TEXT
  );`;

//* SQL queriy to create the exercises table
export const createExercisesTableQuery = `
  CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY, 
    workout_id TEXT, 
    name TEXT, 
    FOREIGN KEY (workout_id) REFERENCES workouts (id)
  );`;

export const getDB = async () => {
  if (db) return db;

  db = await SQLite.openDatabaseAsync(dbName);

  await db.withTransactionAsync(async () => {
    if (!db) {
      return;
    }
    await db.execAsync(createWorkoutsTableQuery);
    await db.execAsync(createExercisesTableQuery);
  });
  return db;
};

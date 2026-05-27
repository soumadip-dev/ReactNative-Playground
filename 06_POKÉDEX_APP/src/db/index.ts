import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const dbName = 'pokemon.db';

const createFavoritesTable = `
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL
)
`;

export const getDB = async () => {
  if (db) return db;

  db = await SQLite.openDatabaseAsync(dbName);

  await db.execAsync(createFavoritesTable);

  return db;
};

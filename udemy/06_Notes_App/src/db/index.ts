import * as SQLite from 'expo-sqlite';

export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

let db: SQLite.SQLiteDatabase | null = null;

const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('notes.db');
    await db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      `
    );
  }
  return db;
};

export const initDatabase = async (): Promise<void> => {
  await getDatabase();
};

export const getNotes = async (): Promise<Note[]> => {
  const database = await getDatabase();
  return await database.getAllAsync<Note>(
    `
    SELECT * FROM notes ORDER BY created_at DESC;
    `
  );
};

export const addNote = async (title: string, content: string): Promise<SQLite.SQLiteRunResult> => {
  const database = await getDatabase();
  const createdAt = new Date().toISOString();
  return await database.runAsync(
    `
    INSERT INTO notes (title, content, created_at) VALUES (?, ?, ?);
    `,
    [title, content, createdAt]
  );
};

export const deleteNote = async (id: number): Promise<SQLite.SQLiteRunResult> => {
  const database = await getDatabase();
  return await database.runAsync(
    `
    DELETE FROM notes WHERE id = ?;
    `,
    [id]
  );
};

export const updateNote = async (
  id: number,
  title: string,
  content: string
): Promise<SQLite.SQLiteRunResult> => {
  const database = await getDatabase();
  return await database.runAsync(
    `
    UPDATE notes SET title = ?, content = ? WHERE id = ?;
    `,
    [title, content, id]
  );
};

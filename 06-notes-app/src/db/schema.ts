import { getDatabase } from './client';

export const initDatabase = async (): Promise<void> => {
  const database = await getDatabase();
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
};

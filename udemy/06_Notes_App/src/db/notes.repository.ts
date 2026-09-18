import * as SQLite from 'expo-sqlite';
import { getDatabase } from './client';
import { Note } from '@/types/note';

export const getNotes = async (): Promise<Note[]> => {
  const database = await getDatabase();
  return await database.getAllAsync<Note>('SELECT * FROM notes ORDER BY created_at DESC;');
};

export const addNote = async (title: string, content: string): Promise<SQLite.SQLiteRunResult> => {
  const database = await getDatabase();
  const createdAt = new Date().toISOString();
  return await database.runAsync(
    'INSERT INTO notes (title, content, created_at) VALUES (?, ?, ?);',
    [title, content, createdAt]
  );
};

export const updateNote = async (
  id: number,
  title: string,
  content: string
): Promise<SQLite.SQLiteRunResult> => {
  const database = await getDatabase();
  return await database.runAsync('UPDATE notes SET title = ?, content = ? WHERE id = ?;', [
    title,
    content,
    id,
  ]);
};

export const deleteNote = async (id: number): Promise<SQLite.SQLiteRunResult> => {
  const database = await getDatabase();
  return await database.runAsync('DELETE FROM notes WHERE id = ?;', [id]);
};

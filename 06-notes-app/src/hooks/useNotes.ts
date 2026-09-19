import { useState, useEffect, useCallback } from 'react';
import { Note } from '@/types/note';
import { initDatabase } from '@/db/schema';
import { getNotes, addNote, updateNote, deleteNote } from '@/db/notes.repository';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const loadNotes = useCallback(async () => {
    const allNotes = await getNotes();
    setNotes(allNotes);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await initDatabase();
      await loadNotes();
    };
    initialize();
  }, [loadNotes]);

  const handleNewNote = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsModalOpen(true);
  };

  const handleDeleteNote = async (id: number) => {
    await deleteNote(id);
    await loadNotes();
  };

  const handleSaveNote = async () => {
    if (!title.trim() && !content.trim()) {
      setIsModalOpen(false);
      return;
    }
    if (editingNote) {
      await updateNote(editingNote.id, title, content);
    } else {
      await addNote(title, content);
    }
    handleCancel();
    await loadNotes();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    setEditingNote(null);
  };

  return {
    notes,
    title,
    content,
    isModalOpen,
    editingNote,
    setTitle,
    setContent,
    handleNewNote,
    handleEditNote,
    handleDeleteNote,
    handleSaveNote,
    handleCancel,
  };
};

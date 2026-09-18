import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Note } from '@/types/note';
import { styles } from '@/styles/index.styles';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <TouchableOpacity style={styles.noteCard} onPress={() => onEdit(note)} activeOpacity={0.7}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        <TouchableOpacity
          style={styles.deleteTouchable}
          onPress={() => onDelete(note.id)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.deleteButton}>✕</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.noteContent} numberOfLines={3}>
        {note.content}
      </Text>
    </TouchableOpacity>
  );
};

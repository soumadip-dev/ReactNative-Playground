import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Note } from '@/types/note';
import { COLORS } from '@/constants/colors';
import { styles } from '@/styles/index.styles';

interface NoteFormModalProps {
  visible: boolean;
  editingNote: Note | null;
  title: string;
  content: string;
  onChangeTitle: (text: string) => void;
  onChangeContent: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const NoteFormModal: React.FC<NoteFormModalProps> = ({
  visible,
  editingNote,
  title,
  content,
  onChangeTitle,
  onChangeContent,
  onSave,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalHeading}>{editingNote ? 'Edit Note' : 'New Note'}</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={onChangeTitle}
            placeholderTextColor={COLORS.textPlaceholder}
            autoFocus={true}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Content..."
            value={content}
            placeholderTextColor={COLORS.textPlaceholder}
            onChangeText={onChangeContent}
            multiline={true}
            textAlignVertical="top"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={onSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

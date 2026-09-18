import { View, FlatList } from 'react-native';
import { useNotes } from '@/hooks/useNotes';
import { Header } from '@/components/Header';
import { NoteCard } from '@/components/NoteCard';
import { EmptyState } from '@/components/EmptyState';
import { NoteFormModal } from '@/components/NoteFormModal';
import { styles } from '@/styles/index.styles';

export default function Index() {
  const {
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
  } = useNotes();

  return (
    <View style={styles.container}>
      <Header count={notes.length} onAdd={handleNewNote} />

      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteCard note={item} onEdit={handleEditNote} onDelete={handleDeleteNote} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={notes.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={<EmptyState />}
      />

      <NoteFormModal
        visible={isModalOpen}
        editingNote={editingNote}
        title={title}
        content={content}
        onChangeTitle={setTitle}
        onChangeContent={setContent}
        onSave={handleSaveNote}
        onCancel={handleCancel}
      />
    </View>
  );
}

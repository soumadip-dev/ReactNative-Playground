import { View, Text, TextInput } from '@/components/general/Themed';
import { Modal, Pressable, StyleSheet } from 'react-native';
import CustomButton from '../general/CustomButton';
import { useState } from 'react';
import Card from '../general/Card';
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import exercises from '@/data/exercises';
import { useThemeColor } from '@/components/general/Themed';

type SelectExerciseModalProps = {
  onSelectExercise: (name: string) => void;
};

export default function SelectExerciseModal({ onSelectExercise }: SelectExerciseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <CustomButton
        title="Select exercise"
        style={{ marginBottom: 20, borderRadius: 14 }}
        onPress={() => setIsOpen(true)}
      />
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0, 0.85)' }]}>
          <Card title="Select exercise" style={styles.modalContent}>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                style={[
                  styles.input,
                  {
                    backgroundColor: useThemeColor({}, 'textInputBackground'),
                    color: textColor,
                    borderRadius: 12,
                  },
                ]}
                placeholderTextColor={textColor + '40'}
              />
              <Pressable
                onPress={() => setIsOpen(false)}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && { opacity: 0.6, transform: [{ scale: 0.95 }] },
                ]}
              >
                <AntDesign name="close" size={22} color={textColor + '60'} />
              </Pressable>
            </View>
            <FlatList
              data={filteredExercises}
              contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelectExercise(item.name);
                    setIsOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.exerciseItem,
                    pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
                  ]}
                >
                  <View style={[styles.exerciseDot, { backgroundColor: tint }]} />
                  <View style={styles.exerciseContent}>
                    <Text style={[styles.exerciseName, { color: textColor }]}>{item.name}</Text>
                    <Text style={[styles.muscleName, { color: textColor + '50' }]}>
                      {item.muscle}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  exerciseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.7,
  },
  exerciseContent: {
    flex: 1,
    gap: 4,
  },
  exerciseName: {
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  muscleName: {
    fontSize: 12,
    letterSpacing: -0.2,
  },
});

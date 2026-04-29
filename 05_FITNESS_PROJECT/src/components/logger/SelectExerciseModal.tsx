import { View, Text } from '@/components/general/Themed';
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
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  return (
    <>
      <CustomButton
        title="Select exercise"
        style={{ marginBottom: 20, borderRadius: 14 }}
        onPress={() => setIsOpen(true)}
      />
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.75)' }]}>
          <Card title="Select exercise" style={styles.modalContent}>
            <View style={styles.header}>
              <View />
              <Pressable
                onPress={() => setIsOpen(false)}
                style={({ pressed }) => [
                  styles.closeButton,
                  { borderColor: textColor + '15' },
                  pressed && { opacity: 0.5, transform: [{ scale: 0.92 }] },
                ]}
              >
                <AntDesign name="close" size={16} color={textColor + '80'} />
              </Pressable>
            </View>

            <View style={[styles.divider, { backgroundColor: textColor + '10' }]} />

            <FlatList
              data={exercises}
              keyExtractor={item => item.name}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelectExercise(item.name);
                    setIsOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.exerciseItem,
                    { borderColor: textColor + '08', backgroundColor: textColor + '04' },
                    pressed && {
                      opacity: 0.65,
                      transform: [{ scale: 0.97 }],
                      backgroundColor: tint + '12',
                    },
                  ]}
                >
                  <View style={[styles.accentBar, { backgroundColor: tint }]} />

                  <View style={styles.exerciseContent}>
                    <Text style={[styles.exerciseName, { color: textColor }]}>{item.name}</Text>
                    <Text style={[styles.muscleName, { color: textColor + '55' }]}>
                      {item.muscle}
                    </Text>
                  </View>

                  <AntDesign name="right" size={12} color={textColor + '25'} />
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
    borderRadius: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 14,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128,128,128,0.07)',
  },

  divider: {
    height: 1,
    borderRadius: 1,
    marginBottom: 16,
  },
  listContent: {
    gap: 8,
    paddingBottom: 24,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  accentBar: {
    width: 3,
    height: 36,
    borderRadius: 2,
    opacity: 0.75,
  },

  exerciseContent: {
    flex: 1,
    gap: 3,
  },

  exerciseName: {
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: -0.3,
  },

  muscleName: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
});

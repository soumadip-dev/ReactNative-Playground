import { Text, StyleSheet, Pressable } from 'react-native';

type AnswerOptionProps = {
  option: string;
  onPress: () => void;
  isSelected: boolean;
};

export default function AnswerOption({ option, isSelected, onPress }: AnswerOptionProps) {
  return (
    <Pressable style={[styles.container, isSelected && styles.selectedContainer]} onPress={onPress}>
      <Text style={styles.text}>{option}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  selectedContainer: {
    borderColor: '#005055',
    backgroundColor: '#d6f1f3ff',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    letterSpacing: 0.3,
  },
});

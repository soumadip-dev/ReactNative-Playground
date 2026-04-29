import { View, Text, TextInput } from '@/components/general/Themed';
import { ExerciseSet } from '@/types/models';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/components/general/Themed';

type SetItemProps = {
  index: number;
  set: ExerciseSet;
};

export default function SetItem({ index, set }: SetItemProps) {
  const [weight, setWeight] = useState(set.weight?.toString() || '');
  const [reps, setReps] = useState(set.reps?.toString() || '');
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const handleWeightChange = () => {
    console.warn('Weight changed to: ', weight);
  };
  const handleRepsChange = () => {
    console.warn('Reps changed to: ', reps);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.setNumberBadge, { backgroundColor: tint + '08' }]}>
        <Text style={[styles.setNumber, { color: textColor }]}>{index + 1}</Text>
      </View>
      <TextInput
        placeholder="50"
        value={weight}
        onChangeText={setWeight}
        style={[
          styles.input,
          { backgroundColor: useThemeColor({}, 'textInputBackground'), color: textColor },
        ]}
        keyboardType="numeric"
        onBlur={handleWeightChange}
        placeholderTextColor={textColor + '40'}
      />
      <TextInput
        placeholder="8"
        value={reps}
        onChangeText={setReps}
        style={[
          styles.input,
          { backgroundColor: useThemeColor({}, 'textInputBackground'), color: textColor },
        ]}
        keyboardType="numeric"
        onBlur={handleRepsChange}
        placeholderTextColor={textColor + '40'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  setNumberBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
  },
  setNumber: {
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  input: {
    width: 70,
    padding: 10,
    paddingVertical: 12,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 12,
    fontWeight: '500',
  },
});

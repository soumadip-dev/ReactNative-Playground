import { View, Text, TextInput } from '@/components/general/Themed';
import { ExerciseSet } from '@/types/models';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/components/general/Themed';
import { useWorkout } from '@/store';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CustomButton from '../general/CustomButton';

type SetItemProps = {
  index: number;
  set: ExerciseSet;
};

export default function SetItem({ index, set }: SetItemProps) {
  const [weight, setWeight] = useState(set.weight?.toString() || '');
  const [reps, setReps] = useState(set.reps?.toString() || '');
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const backgroundColour = useThemeColor({}, 'background');
  const updateSet = useWorkout(state => state.updateSet);
  const deleteSet = useWorkout(state => state.deleteSet);
  const handleWeightChange = () => {
    updateSet(set.id, { weight: parseFloat(weight) });
  };
  const handleRepsChange = () => {
    updateSet(set.id, { reps: parseInt(reps) });
  };

  const renderRightActions = () => (
    <CustomButton
      onPress={() => deleteSet(set.id)}
      title="Delete"
      type="link"
      style={{
        width: 'auto',
        padding: 5,
        backgroundColor: backgroundColour,
        borderRadius: 2,
      }}
      color="crimson"
    />
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
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
    </Swipeable>
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

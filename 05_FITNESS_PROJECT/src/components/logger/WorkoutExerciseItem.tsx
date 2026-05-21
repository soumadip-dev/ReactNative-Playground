import { View, Text } from '@/components/general/Themed';
import { StyleSheet } from 'react-native';
import Card from '../general/Card';
import { ExerciseSet, ExerciseWithSets } from '@/types/models';
import SetItem from './SetItem';
import CustomButton from '../general/CustomButton';
import { useThemeColor } from '@/components/general/Themed';

type WorkoutExerciseItemProps = { exercise: ExerciseWithSets };

export default function WorkoutExerciseItem({ exercise }: WorkoutExerciseItemProps) {
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const sets: ExerciseSet[] = [
    {
      id: '1',
      weight: 20,
      reps: 10,
      exerciseId: 'e1',
    },
    {
      id: '2',
      weight: 50,
      reps: 5,
      exerciseId: 'e1',
    },
  ];

  return (
    <Card title={exercise.name}>
      <View style={[styles.header, { borderBottomColor: tint + '15' }]}>
        <Text style={[styles.setNumber, { color: textColor + '50' }]}>Set</Text>
        <Text style={[styles.setInfo, { color: textColor + '50' }]}>kg</Text>
        <Text style={[styles.setInfo, { color: textColor + '50' }]}>Reps</Text>
      </View>
      <View style={{ gap: 8 }}>
        {exercise.sets.map((set, index) => (
          <SetItem key={set.id} index={index} set={set} />
        ))}
      </View>
      <CustomButton
        title="+ Add set"
        type="link"
        style={{ padding: 12, marginTop: 12, elevation: 0, borderRadius: 12 }}
        onPress={() => console.warn('Adding set')}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 8,
    gap: 5,
    borderBottomWidth: 1,
  },
  setNumber: {
    marginRight: 'auto',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  setInfo: {
    width: 60,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

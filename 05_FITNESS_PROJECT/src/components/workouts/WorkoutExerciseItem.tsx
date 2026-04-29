import { View, Text } from '@/components/general/Themed';
import { StyleSheet } from 'react-native';
import Card from '../general/Card';
import { getBestSet } from '@/services/setService';
import Colors from '@/constants/Colors';
import { ExerciseWithSets } from '@/types/models';
import { useThemeColor } from '@/components/general/Themed';

type WorkoutExerciseItemProps = {
  exercise: ExerciseWithSets;
};

export default function WorkoutExerciseItem({ exercise }: WorkoutExerciseItemProps) {
  const bestSet = getBestSet(exercise.sets);
  
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  return (
    <Card title={exercise.name}>
      {exercise.sets.map((exerciseSet, index) => (
        <View
          key={exerciseSet.id}
          style={[
            styles.setRow,
            {
              backgroundColor: exerciseSet.id === bestSet?.id ? tint + '12' : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.setIndex,
              { color: exerciseSet.id === bestSet?.id ? tint : textColor + '60' },
            ]}
          >
            {index + 1}
          </Text>
          <Text style={[styles.setInfo, { color: textColor }]}>
            {exerciseSet.reps} {exerciseSet.weight ? `x ${exerciseSet.weight} kg` : 'reps'}
          </Text>
          {exerciseSet.oneRM && (
            <Text
              style={[
                styles.setOneRm,
                { color: exerciseSet.id === bestSet?.id ? tint : textColor },
              ]}
            >
              {Math.floor(exerciseSet.oneRM)} kg
            </Text>
          )}
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  setRow: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  setIndex: {
    fontSize: 15,
    fontWeight: '600',
    width: 32,
  },
  setInfo: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    letterSpacing: -0.2,
  },
  setOneRm: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

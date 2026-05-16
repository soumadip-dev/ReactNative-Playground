import { View, Text } from '@/components/general/Themed';
import { WorkoutWithExercises } from '@/types/models';
import Card from '../general/Card';
import { StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type WorkoutListItemProps = {
  workout: WorkoutWithExercises;
};

export default function WorkoutListItem({ workout }: WorkoutListItemProps) {
  return (
    <Card title={'Workout createdAT'} href={`/workout/${workout.id}`} style={{ gap: 8 }}>
      <View style={styles.row}>
        <Text style={styles.label}>Exercise</Text>
        <Text style={styles.label}>Best set</Text>
      </View>
      {workout.exercises.map(exercise => {
        const bestSet = { reps: 5, weight: 60 };
        return (
          <View key={exercise.id} style={styles.row}>
            <Text style={{ color: 'gray' }}>
              {exercise.sets.length} x {exercise.name}
            </Text>
            {bestSet && (
              <Text style={{ color: 'gray' }}>
                {bestSet.reps} x {bestSet.weight}
              </Text>
            )}
          </View>
        );
      })}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          <FontAwesome5 name="clock" size={16} color="gray" /> 2:45
        </Text>
        <Text>
          <FontAwesome5 name="weight-hanging" size={16} color="gray" /> 580
        </Text>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    gap: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333',
    marginTop: 10,
    paddingTop: 10,
  },
});

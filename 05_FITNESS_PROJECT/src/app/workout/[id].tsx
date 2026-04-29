import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/general/Themed';
import dummyWorkouts from '@/data/dummyWorkouts';
import { FlatList } from 'react-native-gesture-handler';
import WorkoutExerciseItem from '@/components/workouts/WorkoutExerciseItem';
import dayjs from 'dayjs';
import { useThemeColor } from '@/components/general/Themed';
import { useWorkout } from '@/store';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  const workout = useWorkout(state => state.workouts.find(workout => workout.id === id));
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  if (!workout) {
    return <Text>Workout not found</Text>;
  }

  return (
    <FlatList
      data={workout.exercises}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View style={[styles.accentLine, { backgroundColor: tint }]} />
            <Text style={[styles.title, { color: textColor }]}>Workout details</Text>
          </View>
          <View style={styles.dateWrapper}>
            <View style={[styles.dateDot, { backgroundColor: tint }]} />
            <Text style={[styles.date, { color: textColor + '80' }]}>
              {dayjs(workout.createdAt).format('HH:mm dddd, D MMM')}
            </Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
    padding: 16,
    paddingTop: 8,
  },
  headerContainer: {
    marginBottom: 8,
    marginTop: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  accentLine: {
    width: 4,
    height: 28,
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 16,
  },
  dateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.7,
  },
  date: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.2,
    opacity: 0.7,
  },
});

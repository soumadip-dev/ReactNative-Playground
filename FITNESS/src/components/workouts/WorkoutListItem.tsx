import { View, Text } from '@/components/general/Themed';
import { WorkoutWithExercises } from '@/types/models';
import Card from '../general/Card';
import { StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useThemeColor } from '@/components/general/Themed';
import dayjs from 'dayjs';
import { calculateDuration } from '@/utils/time';
import { getBestSet } from '@/services/setService';
import { getWorkoutTotalWeight } from '@/services/workoutService';

type WorkoutListItemProps = {
  workout: WorkoutWithExercises;
};

export default function WorkoutListItem({ workout }: WorkoutListItemProps) {
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  return (
    <Card
      title={dayjs(workout.createdAt).format('HH:mm dddd, D MMM')}
      href={`/workout/${workout.id}`}
      style={{ gap: 8 }}
    >
      <View style={styles.exercisesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Movements</Text>
          <Text style={styles.sectionSubtitle}>{workout.exercises.length} exercises</Text>
        </View>

        {workout.exercises.map((exercise, index) => {
          const bestSet = getBestSet(exercise.sets);
          return (
            <View
              key={exercise.id}
              style={[
                styles.exerciseCard,
                index === workout.exercises.length - 1 && styles.lastExerciseCard,
              ]}
            >
              <View style={[styles.exerciseBadge, { backgroundColor: tint + '12' }]}>
                <Text style={[styles.exerciseNumber, { color: tint }]}>{index + 1}</Text>
              </View>

              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName} numberOfLines={1}>
                  {exercise.name}
                </Text>
                <View style={styles.setInfo}>
                  <FontAwesome5 name="dumbbell" size={10} color={textColor + '60'} />
                  <Text style={styles.setCount}>{exercise.sets.length} sets</Text>
                </View>
              </View>

              {bestSet && (
                <View style={styles.bestSetContainer}>
                  <Text style={[styles.bestSetLabel, { color: tint }]}>PR</Text>
                  <View style={styles.bestSetValue}>
                    <Text style={styles.bestSetReps}>{bestSet.reps}</Text>
                    <Text style={styles.bestSetUnit}>×</Text>
                    <Text style={styles.bestSetWeight}>{bestSet.weight}</Text>
                    <Text style={styles.bestSetUnit}>kg</Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <View style={[styles.metricIconBg, { backgroundColor: tint + '10' }]}>
              <FontAwesome5 name="clock" size={12} color={tint} />
            </View>
            <View>
              <Text style={styles.metricLabel}>Duration</Text>
              <Text style={styles.metricValue}>
                {' '}
                {calculateDuration(workout.createdAt, workout.finishedAt)}
              </Text>
            </View>
          </View>

          <View style={styles.metricDivider} />

          <View style={styles.metricItem}>
            <View style={[styles.metricIconBg, { backgroundColor: tint + '10' }]}>
              <FontAwesome5 name="weight-hanging" size={12} color={tint} />
            </View>
            <View>
              <Text style={styles.metricLabel}>Volume</Text>
              <Text style={styles.metricValue}> {getWorkoutTotalWeight(workout)} kg</Text>
            </View>
          </View>
        </View>

        <View style={[styles.interactiveHint, { backgroundColor: tint + '08' }]}>
          <View style={[styles.hintRing, { backgroundColor: tint + '15' }]}>
            <FontAwesome5 name="chevron-right" size={12} color={tint} />
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  exercisesContainer: {
    gap: 12,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    opacity: 0.5,
  },
  sectionSubtitle: {
    fontSize: 11,
    opacity: 0.4,
    fontWeight: '500',
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  lastExerciseCard: {
    borderBottomWidth: 0,
  },
  exerciseBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseNumber: {
    fontSize: 14,
    fontWeight: '700',
  },
  exerciseInfo: {
    flex: 1,
    gap: 5,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  setInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  setCount: {
    fontSize: 12,
    opacity: 0.5,
    fontWeight: '500',
  },
  bestSetContainer: {
    alignItems: 'flex-end',
    gap: 3,
  },
  bestSetLabel: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    opacity: 0.7,
  },
  bestSetValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  bestSetReps: {
    fontSize: 15,
    fontWeight: '700',
  },
  bestSetWeight: {
    fontSize: 15,
    fontWeight: '700',
  },
  bestSetUnit: {
    fontSize: 11,
    opacity: 0.4,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metricIconBg: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    fontSize: 10,
    opacity: 0.45,
    marginBottom: 2,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  interactiveHint: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Dark mode overrides for better card differentiation
const darkModeOverrides = {
  exerciseCard: {
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  metricDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  footer: {
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
};

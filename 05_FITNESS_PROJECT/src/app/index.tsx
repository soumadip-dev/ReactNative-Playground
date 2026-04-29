import { Link } from 'expo-router';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, View } from '@/components/general/Themed';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/general/CustomButton';
import WorkoutListItem from '@/components/workouts/WorkoutListItem';
import { useWorkout } from '@/store';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function HomeScreen() {
  const currentWorkout = useWorkout(state => state.currentWorkout);
  const startWorkout = useWorkout(state => state.startWorkout);
  const workouts = useWorkout(state => state.workouts);

  return (
    <View style={styles.container}>
      {currentWorkout ? (
        <Link href="/workout/current" asChild>
          <CustomButton title="Resume Workout" />
        </Link>
      ) : (
        <CustomButton title="Start New Workout" onPress={startWorkout} />
      )}

      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 8, flexGrow: 1 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
}

function EmptyState() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      style={[
        styles.emptyContainer,
        { borderColor: colors.cardBorder, borderWidth: 1.5, borderStyle: 'dashed' },
      ]}
    >
      <Ionicons name="clipboard-outline" size={48} color={colors.tabIconDefault} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No workouts yet</Text>
      <Text style={[styles.emptyText, { color: colors.tabIconSelected }]}>
        You haven't added any workout plans. Start a new workout to get going.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 16,
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 20,
    gap: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  emptyTitle: {
    fontFamily: 'BarlowCondensed_700Bold',
    fontSize: 20,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 13.5,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 240,
  },
});

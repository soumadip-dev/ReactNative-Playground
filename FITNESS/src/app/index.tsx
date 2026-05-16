import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { View } from '@/components/general/Themed';
import CustomButton from '@/components/general/CustomButton';
import { FlatList } from 'react-native';
import workouts from '@/data/dummyWorkouts';
import WorkoutListItem from '@/components/workouts/WorkoutListItem';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/workout/current" asChild>
        <CustomButton title="Resume Workout" />
      </Link>
      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
});

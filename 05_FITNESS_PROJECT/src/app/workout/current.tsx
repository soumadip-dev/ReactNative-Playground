import { View } from '@/components/general/Themed';
import { Redirect, Stack } from 'expo-router';
import CustomButton from '@/components/general/CustomButton';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import WorkoutExerciseItem from '@/components/logger/WorkoutExerciseItem';
import SelectExerciseModal from '@/components/logger/SelectExerciseModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WorkoutHeader from '@/components/logger/WorkoutHeader';
import { useWorkout } from '@/store';

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkout(state => state.currentWorkout);
  const finshWorkout = useWorkout(state => state.finshWorkout);

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  if (!currentWorkout) {
    return <Redirect href={'/'} />;
  }

  const onFinishWorkout = () => {
    finshWorkout();
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton onPress={onFinishWorkout} title="Finish" style={styles.finishButton} />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : insets.bottom + 20}
      >
        <FlatList
          data={[1, 2, 3]}
          contentContainerStyle={styles.flatListContent}
          renderItem={() => <WorkoutExerciseItem />}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExerciseModal
              onSelectExercise={name => {
                console.log('Exercise seleted: ', name);
              }}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  finishButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: 'auto',
    borderRadius: 6,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  flatListContent: {
    gap: 10,
    padding: 10,
  },
});

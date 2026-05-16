import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/general/Themed';
import { Stack } from 'expo-router';
import CustomButton from '@/components/general/CustomButton';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import WorkoutExerciseItem from '@/components/workouts/WorkoutExerciseItem';

export default function CurrentWorkoutScreen() {
  const headerHeight = useHeaderHeight();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              onPress={() => console.warn('Finish workout')}
              title="Finish"
              style={{
                paddingVertical: 12,
                paddingHorizontal: 15,
                width: 'auto',
                borderRadius: 6,
              }}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={[1, 2, 3]}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          renderItem={() => <WorkoutExerciseItem />}
        />
      </KeyboardAvoidingView>
    </>
  );
}

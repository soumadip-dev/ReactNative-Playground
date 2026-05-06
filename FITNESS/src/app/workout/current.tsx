import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/general/Themed';

export default function CurrentWorkoutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Current Workout</Text>
        <Text style={styles.subtitle}>Track your progress and stay motivated</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  main: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

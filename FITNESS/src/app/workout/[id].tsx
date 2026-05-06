import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/general/Themed';

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Workout Screen</Text>
        <Text style={styles.id}>Workout {id}</Text>
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
  card: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  id: {
    fontSize: 18,
  },
});

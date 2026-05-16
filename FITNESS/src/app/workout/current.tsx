import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 24,
  },
  main: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});

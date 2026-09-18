import { View, StyleSheet } from 'react-native';
import AccelerometerMonitor from '@/components/Accelerometer';
import GyroscopeMonitor from '@/components/Gyroscope';

export default function MotionDashboardScreen() {
  return (
    <View style={styles.screenContainer}>
      <AccelerometerMonitor />
      <GyroscopeMonitor />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
});

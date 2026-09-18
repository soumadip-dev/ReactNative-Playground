import { View, StyleSheet } from 'react-native';
import AccelerometerMonitor from '@/components/Accelerometer';
import GyroscopeMonitor from '@/components/Gyroscope';
import Compass from '@/components/Megnetometer';

export default function MotionDashboardScreen() {
  return (
    <View style={styles.screenContainer}>
      <AccelerometerMonitor />
      <GyroscopeMonitor />
      <Compass />
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

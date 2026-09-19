import { View, StyleSheet } from 'react-native';
import AccelerometerMonitor from '@/components/Accelerometer';
import GyroscopeMonitor from '@/components/Gyroscope';
import Compass from '@/components/Megnetometer';
import LightsensorExample from '@/components/Lightsensor';

export default function MotionDashboardScreen() {
  return (
    <View style={styles.screenContainer}>
      <AccelerometerMonitor />
      <GyroscopeMonitor />
      <Compass />
      <LightsensorExample />
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

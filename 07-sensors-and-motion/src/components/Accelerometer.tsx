import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

type DeviceTiltStatus = 'Stable' | 'Tilt Right' | 'Tilt Left' | 'Tilt Up' | 'Tilt Down';

interface AccelerometerAxes {
  xAxis: number;
  yAxis: number;
}

export default function AccelerometerMonitor() {
  const [axes, setAxes] = useState<AccelerometerAxes>({ xAxis: 0, yAxis: 0 });
  const [tiltStatus, setTiltStatus] = useState<DeviceTiltStatus>('Stable');

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(({ x, y }) => {
      setAxes({ xAxis: x, yAxis: y });

      if (Math.abs(x) > 0.4) {
        setTiltStatus(x > 0 ? 'Tilt Right' : 'Tilt Left');
      } else if (Math.abs(y) > 0.4) {
        setTiltStatus(y > 0 ? 'Tilt Up' : 'Tilt Down');
      } else {
        setTiltStatus('Stable');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>Accelerometer</Text>
      <Text style={styles.statusBadge}>Status: {tiltStatus}</Text>

      <View style={styles.metricsContainer}>
        <Text style={styles.metricText}>X: {axes.xAxis.toFixed(2)}</Text>
        <Text style={styles.metricText}>Y: {axes.yAxis.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    maxWidth: 320,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  statusBadge: {
    fontSize: 15,
    fontWeight: '600',
    color: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  metricText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94A3B8',
    fontVariant: ['tabular-nums'],
  },
});

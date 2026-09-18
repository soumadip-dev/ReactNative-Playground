import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

export const TiltCounter: React.FC = () => {
  const [data, setData] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState<'Stable' | 'Tilt Right' | 'Tilt Left' | 'Tilt Up' | 'Tilt Down'>(
    'Stable'
  );

  useEffect(() => {
    const subscription = Accelerometer.addListener(({ x, y }) => {
      setData({ x, y });
      if (Math.abs(x) > 0.4) setTilt(x > 0 ? 'Tilt Right' : 'Tilt Left');
      else if (Math.abs(y) > 0.4) setTilt(y > 0 ? 'Tilt Up' : 'Tilt Down');
      else setTilt('Stable');
    });

    Accelerometer.setUpdateInterval(100);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Accelerometer</Text>
      <Text style={styles.status}>Status: {tilt}</Text>
      <Text style={styles.value}>x: {data.x.toFixed(2)}</Text>
      <Text style={styles.value}>y: {data.y.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    gap: 8,
    minWidth: 200,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ADE80',
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#A0A0A0',
    fontVariant: ['tabular-nums'],
  },
});

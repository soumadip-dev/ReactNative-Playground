import { View, Text } from '@/components/general/Themed';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import dummyWorkouts from '@/data/dummyWorkouts';
import { calculateDurationHourMinutes } from '@/utils/time';
import { useThemeColor } from '@/components/general/Themed';

export default function WorkoutHeader() {
  const [timer, setTimer] = useState('0:00');
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const workout = dummyWorkouts[0];

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = calculateDurationHourMinutes(new Date(workout.createdAt), new Date());
      setTimer(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [workout]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={[styles.accentBar, { backgroundColor: tint }]} />
        <Text style={[styles.title, { color: textColor }]}>Workout tracker</Text>
      </View>
      <View style={styles.timerContainer}>
        <View style={styles.timerRow}>
          <FontAwesome5 name="clock" size={13} color={tint} />
          <Text style={[styles.timerText, { color: textColor }]}>{timer}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  accentBar: {
    width: 4,
    height: 28,
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 16,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerText: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.2,
    opacity: 0.7,
  },
});

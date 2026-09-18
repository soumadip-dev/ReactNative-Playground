import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

type GyroscopeSubscription = ReturnType<typeof Gyroscope.addListener>;

export default function GyroscopeMonitor() {
  const [rotationProgressPercent, setRotationProgressPercent] = useState<number>(0);

  useEffect(() => {
    let gyroscopeSubscription: GyroscopeSubscription | undefined;

    const setupGyroscope = async () => {
      const isSensorAvailable = await Gyroscope.isAvailableAsync();
      if (!isSensorAvailable) {
        return;
      }

      Gyroscope.setUpdateInterval(100);

      gyroscopeSubscription = Gyroscope.addListener(data => {
        const zAxisAngularVelocity = data?.z ?? 0;

        const rawIncrement = Math.abs(zAxisAngularVelocity) * 2;
        const validIncrement = Number.isNaN(rawIncrement) ? 0 : rawIncrement;

        setRotationProgressPercent(previousProgress => {
          const safePrevious = Number.isNaN(previousProgress) ? 0 : previousProgress;
          const updatedProgress = safePrevious + validIncrement;
          return Math.min(updatedProgress, 100);
        });
      });
    };

    setupGyroscope();

    return () => {
      gyroscopeSubscription?.remove();
    };
  }, []);

  const safePercentage = Number.isNaN(rotationProgressPercent) ? 0 : rotationProgressPercent;
  const formattedPercentage = Math.round(safePercentage);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>Gyroscope</Text>
        <Text style={styles.percentageText}>{formattedPercentage}%</Text>
      </View>

      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: `${safePercentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    maxWidth: 340,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    letterSpacing: 0.3,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#38BDF8',
  },
  progressBarTrack: {
    height: 10,
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 999,
  },
});

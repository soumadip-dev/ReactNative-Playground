import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';

type MagnetometerSubscription = ReturnType<typeof Magnetometer.addListener>;

type CardinalDirection = 'North' | 'South' | 'East' | 'West' | 'Unknown';

export default function Compass() {
  const [cardinalDirection, setCardinalDirection] = useState<CardinalDirection>('Unknown');

  useEffect(() => {
    let magnetometerSubscription: MagnetometerSubscription | undefined;

    const setupMagnetometer = async () => {
      const isSensorAvailable = await Magnetometer.isAvailableAsync();
      if (!isSensorAvailable) {
        return;
      }

      Magnetometer.setUpdateInterval(100);

      magnetometerSubscription = Magnetometer.addListener(data => {
        const xAxisMagnetism = data?.x ?? 0;
        const yAxisMagnetism = data?.y ?? 0;

        if (Math.abs(xAxisMagnetism) > Math.abs(yAxisMagnetism)) {
          setCardinalDirection(xAxisMagnetism > 0 ? 'East' : 'West');
        } else {
          setCardinalDirection(yAxisMagnetism > 0 ? 'North' : 'South');
        }
      });
    };

    setupMagnetometer();

    return () => {
      magnetometerSubscription?.remove();
    };
  }, []);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>Compass</Text>

      <View style={styles.readoutContainer}>
        <Text style={styles.readoutLabel}>Current Heading</Text>
        <Text style={styles.directionText}>{cardinalDirection}</Text>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    letterSpacing: 0.3,
    marginBottom: 16,
  },
  readoutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#1E293B',
    borderRadius: 12,
  },
  readoutLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  directionText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#38BDF8',
    letterSpacing: 0.5,
  },
});

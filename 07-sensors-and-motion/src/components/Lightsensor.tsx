import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightSensor } from 'expo-sensors';

type LightSensorSubscription = ReturnType<typeof LightSensor.addListener>;

type LightingMood = 'Bright' | 'Normal' | 'Dim';

export default function LightSensorMonitor() {
  const [illuminanceLux, setIlluminanceLux] = useState<number>(0);

  useEffect(() => {
    let lightSensorSubscription: LightSensorSubscription | undefined;

    const setupLightSensor = async () => {
      const isSensorAvailable = await LightSensor.isAvailableAsync();
      if (!isSensorAvailable) {
        return;
      }

      LightSensor.setUpdateInterval(100);

      lightSensorSubscription = LightSensor.addListener(data => {
        const currentIlluminance = data?.illuminance ?? 0;
        const validIlluminance = Number.isNaN(currentIlluminance) ? 0 : currentIlluminance;

        setIlluminanceLux(validIlluminance);
      });
    };

    setupLightSensor();

    return () => {
      lightSensorSubscription?.remove();
    };
  }, []);

  const ambientLightingMood: LightingMood =
    illuminanceLux > 1000 ? 'Bright' : illuminanceLux > 300 ? 'Normal' : 'Dim';

  const formattedLuxValue = Math.round(illuminanceLux);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>Light Sensor</Text>
        <Text style={styles.statusBadgeText}>{ambientLightingMood}</Text>
      </View>

      <View style={styles.readoutContainer}>
        <Text style={styles.readoutLabel}>Ambient Illuminance</Text>
        <Text style={styles.luxValueText}>
          {formattedLuxValue} <Text style={styles.unitText}>lx</Text>
        </Text>
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
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#38BDF8',
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  readoutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
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
  luxValueText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#38BDF8',
  },
});

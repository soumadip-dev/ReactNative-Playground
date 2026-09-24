import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useBatteryLevel } from 'expo-battery';

export default function Index() {
  const batteryLevel = useBatteryLevel();

  // Convert decimal to percentage format (e.g., 0.85 -> 85%)
  const batteryPercentage =
    batteryLevel !== null && batteryLevel >= 0 ? Math.round(batteryLevel * 100) : null;

  // Determine indicator color based on battery status
  const getBatteryColor = () => {
    if (batteryPercentage === null) return '#64748B';
    if (batteryPercentage <= 20) return '#EF4444'; // Low battery - Red
    if (batteryPercentage <= 50) return '#F59E0B'; // Medium battery - Amber
    return '#10B981'; // High battery - Green
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badgeText}>Device Power Status</Text>

        {batteryPercentage === null ? (
          <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
        ) : (
          <View style={styles.levelContainer}>
            <Text style={[styles.batteryValue, { color: getBatteryColor() }]}>
              {batteryPercentage}%
            </Text>

            {/* Visual Battery Bar Indicator */}
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${batteryPercentage}%`, backgroundColor: getBatteryColor() },
                ]}
              />
            </View>
          </View>
        )}

        <Text style={styles.description}>
          Current Battery Level: {batteryLevel !== null ? batteryLevel.toFixed(2) : 'Fetching...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  loader: {
    marginVertical: 24,
  },
  levelContainer: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  batteryValue: {
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 16,
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
});

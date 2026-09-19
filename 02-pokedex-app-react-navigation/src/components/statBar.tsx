import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export const StatBar = ({ label, value, max = 255, color }: StatBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>

        <Text style={styles.value}>{value}</Text>
      </View>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: {
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  value: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },

  barBackground: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },

  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});

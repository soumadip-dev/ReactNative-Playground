import { StyleSheet, Text, View } from 'react-native';
import { getTypeColor } from '../constants/types';

export const TypeBadge = ({ type, size = 'small' }: { type: string; size?: 'small' | 'large' }) => {
  const backgroundColor = getTypeColor(type);

  return (
    <View
      style={[styles.container, { backgroundColor }, size === 'large' && styles.containerLarge]}
    >
      <Text style={[styles.text, size === 'large' && styles.textLarge]}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    alignSelf: 'flex-start',
  },
  containerLarge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textLarge: {
    fontSize: 14,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PokemonDetails } from '../api/pokemon';
import { COLORS } from '../constants/colors';

interface PokemonCardProps {
  name: string;
  url: string;
  onPress: (detail: PokemonDetails) => void;
}

const PokemonCard = () => {
  return (
    <View>
      <Text>PokemonCard</Text>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 120,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  id: {
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

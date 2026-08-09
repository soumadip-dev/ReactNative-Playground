import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getPokemonDetails, PokemonDetails } from '../api/pokemon';
import { COLORS } from '../constants/colors';

import { TypeBadge } from './type-badge';

interface PokemonCardProps {
  name: string;
  url: string;
  onPress: (detail: PokemonDetails) => void;
}

const PokemonCard = ({ name, url, onPress }: PokemonCardProps) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const idStr = url.split('/').filter(Boolean).pop();
  const id = idStr ? parseInt(idStr) : 0;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  useEffect(() => {
    let isMounted = true;

    const fetchDetails = async () => {
      try {
        const details = await getPokemonDetails(id);

        if (isMounted) {
          setDetails(details);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handlePress = () => {
    if (details) {
      onPress(details);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      disabled={loading}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.info}>
        <Text style={styles.id}>#{String(id).padStart(3, '0')}</Text>

        <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>

        <View style={styles.types}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.subtext} />
          ) : (
            details?.types.map((type, index) => <TypeBadge key={index} type={type.type.name} />)
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    height: 120,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  imageContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  image: {
    width: 100,
    height: 100,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },

  id: {
    marginBottom: 4,
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: 'bold',
  },

  name: {
    marginBottom: 8,
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },

  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

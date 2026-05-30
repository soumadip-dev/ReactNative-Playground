import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getCardColor } from '.';

type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  abilities: string[];
  types: string[];
};

export default function Details() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      fetchPokemonDetails();
    }
  }, [name]);

  async function fetchPokemonDetails() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon details');
      }

      const data = await response.json();

      setPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name
        ),
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#EF5350" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text>No Pokémon found</Text>
      </View>
    );
  }

  const primaryColor = getCardColor(pokemon.types[0]);

  return (
    <View style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View
          style={[
            styles.heroSection,
            {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <Text style={styles.heroId}>#{pokemon.id.toString().padStart(3, '0')}</Text>

          <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>

          <View style={styles.typesContainer}>
            {pokemon.types.map(type => (
              <View
                key={type}
                style={[
                  styles.typeChip,
                  {
                    backgroundColor: getCardColor(type),
                  },
                ]}
              >
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
              <Text style={styles.statLabel}>Height</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Abilities</Text>

            {pokemon.abilities.map(ability => (
              <View key={ability} style={styles.abilityItem}>
                <Text style={styles.abilityText}>{ability.replace('-', ' ')}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },

  heroSection: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  heroId: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    opacity: 0.9,
  },

  image: {
    width: 250,
    height: 250,
  },

  contentCard: {
    marginTop: -30,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 6,
  },

  name: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },

  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 24,
  },

  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },

  typeText: {
    color: '#FFF',
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 18,
    borderRadius: 18,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },

  statLabel: {
    marginTop: 4,
    color: '#6B7280',
    fontWeight: '600',
  },

  section: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },

  abilityItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  abilityText: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#374151',
    fontWeight: '600',
  },
});

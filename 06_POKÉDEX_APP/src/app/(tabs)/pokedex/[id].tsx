import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { statLabels } from '@/constants/pokemon';
import { useFavorites } from '@/lib/favorites';
import { fetchPokemonDetails } from '@/lib/pokeapi';
import Colors, { statColors, typeColors } from '@/theme/colors';
import type { PokemonDetails } from '@/types/pokemon';

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const router = useRouter();
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const { isFavorite, toggleFavorite } = useFavorites();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!id) return null;

  // Fetch Pokémon details when screen loads
  useEffect(() => {
    if (!id) return;

    fetchPokemonDetails(id)
      .then(data => {
        setPokemon(data);
      })
      .catch(error => {
        setError(error.message || 'Failed to load Pokémon');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  // Error or empty state
  if (error || !pokemon) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text.error }]}>
          {error || 'Pokemon not found'}
        </Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || 'normal';

  const backgroundColor = typeColors[primaryType] || typeColors.normal;

  const artworkUrl =
    pokemon.sprites.other['official-artwork'].front_default ??
    pokemon.sprites.front_default ??
    undefined;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor,
            shadowColor: theme.shadow?.medium || '#000',
          },
        ]}
      >
        <View style={styles.headerTop}>
          <Text
            style={[
              styles.pokemonId,
              {
                color: theme.transparent?.white70 || 'rgba(255,255,255,0.7)',
              },
            ]}
          >
            #{String(pokemon.id).padStart(3, '0')}
          </Text>

          <Pressable
            hitSlop={10}
            onPress={() => {
              toggleFavorite({
                id: pokemon.id,
                name: pokemon.name,
              });
            }}
          >
            <Ionicons
              name={isFavorite(pokemon.id) ? 'heart' : 'heart-outline'}
              size={28}
              color={theme.white || '#FFFFFF'}
            />
          </Pressable>
        </View>

        <Text style={styles.pokemonName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map(t => (
            <View
              key={t.type.name}
              style={[
                styles.typeBadge,
                {
                  backgroundColor: theme.transparent?.white25 || 'rgba(255,255,255,0.25)',
                },
              ]}
            >
              <Text style={styles.typeText}>{t.type.name.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Image source={{ uri: artworkUrl }} style={styles.artwork} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <View
          style={[
            styles.infoRow,
            {
              backgroundColor: theme.surface?.primary || '#FFFFFF',
              shadowColor: theme.shadow?.default || '#000',
            },
          ]}
        >
          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, { color: theme.text?.primary || '#000000' }]}>
              {(pokemon.weight / 10).toFixed(1)} kg
            </Text>

            <Text style={[styles.infoLabel, { color: theme.text?.secondary || '#666666' }]}>
              Weight
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.surface?.border || '#E0E0E0' }]} />

          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, { color: theme.text?.primary || '#000000' }]}>
              {(pokemon.height / 10).toFixed(1)} m
            </Text>

            <Text style={[styles.infoLabel, { color: theme.text?.secondary || '#666666' }]}>
              Height
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text?.primary || '#000000' }]}>
          Base Stats
        </Text>

        <View style={styles.statsContainer}>
          {pokemon.stats.map(stat => {
            const statName = stat.stat.name;
            const percentage = (stat.base_stat / 255) * 100;

            return (
              <View key={statName} style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.text?.secondary || '#666666' }]}>
                  {statLabels[statName] || statName.toUpperCase()}
                </Text>

                <Text style={[styles.statValue, { color: theme.text?.primary || '#000000' }]}>
                  {stat.base_stat}
                </Text>

                <View
                  style={[
                    styles.statBarContainer,
                    {
                      backgroundColor: theme.surface?.secondary || '#F0F0F0',
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.statBar,
                      {
                        width: `${percentage}%`,
                        backgroundColor: statColors[statName] || backgroundColor,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text?.primary || '#000000' }]}>
          Abilities
        </Text>

        <View style={styles.abilitiesContainer}>
          {pokemon.abilities.map(a => (
            <View
              key={a.ability.name}
              style={[
                styles.abilityBadge,
                {
                  backgroundColor: theme.surface?.primary || '#FFFFFF',
                  shadowColor: theme.shadow?.default || '#000',
                },
              ]}
            >
              <Text style={[styles.abilityText, { color: theme.text?.primary || '#000000' }]}>
                {a.ability.name
                  .split('-')
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}
              </Text>

              {a.is_hidden && (
                <Text style={[styles.hiddenLabel, { color: theme.text?.secondary || '#666666' }]}>
                  {' '}
                  (Hidden)
                </Text>
              )}
            </View>
          ))}
        </View>

        <Pressable
          style={[
            styles.statsButton,
            {
              backgroundColor,
              shadowColor: theme.shadow?.medium || '#000',
            },
          ]}
          onPress={() =>
            router.push({
              pathname: '/pokemon-stats-modal',
              params: { id },
            })
          }
        >
          <Text style={styles.statsButtonText}>View Detailed Stats</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    paddingBottom: 70,
  },

  centered: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 20,
  },

  errorText: {
    paddingHorizontal: 20,

    fontSize: 16,

    textAlign: 'center',
    opacity: 0.9,
  },

  header: {
    alignItems: 'center',

    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,

    elevation: 8,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    marginBottom: 8,
  },

  pokemonId: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },

  pokemonName: {
    marginTop: 8,
    marginBottom: 16,

    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 0.5,

    color: '#FFFFFF',
    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginTop: 0,
    marginBottom: 24,

    gap: 12,
  },

  typeBadge: {
    paddingHorizontal: 18,
    paddingVertical: 8,

    borderRadius: 25,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
  },

  typeText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,

    color: '#FFFFFF',
  },

  artwork: {
    width: 200,
    height: 200,

    marginTop: 0,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 5,
  },

  content: {
    marginTop: -30,
    padding: 24,
  },

  infoRow: {
    flexDirection: 'row',

    marginBottom: 28,
    padding: 24,

    borderRadius: 20,

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 6,
  },

  infoItem: {
    flex: 1,
    alignItems: 'center',
  },

  infoValue: {
    marginBottom: 6,

    fontSize: 20,
    fontWeight: 'bold',
  },

  infoLabel: {
    marginTop: 4,

    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  divider: {
    width: 1,
    opacity: 0.5,
  },

  sectionTitle: {
    marginBottom: 20,

    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.3,
  },

  statsContainer: {
    marginBottom: 28,
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 14,
  },

  statLabel: {
    width: 65,

    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  statValue: {
    width: 40,

    marginRight: 12,

    fontSize: 14,
    fontWeight: 'bold',

    textAlign: 'right',
  },

  statBarContainer: {
    flex: 1,
    height: 8,

    overflow: 'hidden',
    borderRadius: 4,
  },

  statBar: {
    height: '100%',
    borderRadius: 4,
  },

  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    gap: 10,
  },

  abilityBadge: {
    flexDirection: 'row',

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 25,

    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 1,
  },

  abilityText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  hiddenLabel: {
    marginLeft: 2,

    fontSize: 12,
    fontStyle: 'italic',
  },

  statsButton: {
    alignItems: 'center',

    marginTop: 32,
    paddingVertical: 18,

    borderRadius: 20,

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    elevation: 5,
  },

  statsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,

    color: '#FFFFFF',
  },
});

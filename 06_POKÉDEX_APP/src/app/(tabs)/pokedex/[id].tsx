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

import type { PokemonDetails } from '@/types/pokemon';
import { fetchPokemonDetails } from '@/lib/pokeapi';

import Colors, { statColors, typeColors } from '@/theme/colors';
import { statLabels } from '@/constants/pokemon';

export default function pokemonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  if (!id) return null;

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

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

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
      <View style={[styles.header, { backgroundColor }]}>
        <Text style={[styles.pokemonId, { color: theme.transparent.white70 }]}>
          #{String(pokemon.id).padStart(3, '0')}
        </Text>

        <Text style={styles.pokemonName}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map(t => (
            <View
              key={t.type.name}
              style={[styles.typeBadge, { backgroundColor: theme.transparent.white25 }]}
            >
              <Text style={styles.typeText}>{t.type.name.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Image source={{ uri: artworkUrl }} style={styles.artwork} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <View style={[styles.infoRow, { backgroundColor: theme.surface.primary }]}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, { color: theme.text.primary }]}>
              {(pokemon.weight / 10).toFixed(1)} kg
            </Text>

            <Text style={[styles.infoLabel, { color: theme.text.secondary }]}>Weight</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.surface.border }]} />

          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, { color: theme.text.primary }]}>
              {(pokemon.height / 10).toFixed(1)} m
            </Text>

            <Text style={[styles.infoLabel, { color: theme.text.secondary }]}>Height</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Base Stats</Text>

        <View style={styles.statsContainer}>
          {pokemon.stats.map(stat => {
            const statName = stat.stat.name;
            const percentage = (stat.base_stat / 255) * 100;

            return (
              <View key={statName} style={styles.statRow}>
                <Text style={[styles.statLabel, { color: theme.text.secondary }]}>
                  {statLabels[statName] || statName.toUpperCase()}
                </Text>

                <Text style={[styles.statValue, { color: theme.text.primary }]}>
                  {stat.base_stat}
                </Text>

                <View
                  style={[
                    styles.statBarContainer,
                    {
                      backgroundColor: theme.surface.secondary,
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

        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Abilities</Text>

        <View style={styles.abilitiesContainer}>
          {pokemon.abilities.map(a => (
            <View
              key={a.ability.name}
              style={[
                styles.abilityBadge,
                {
                  backgroundColor: theme.surface.primary,
                },
              ]}
            >
              <Text style={[styles.abilityText, { color: theme.text.primary }]}>
                {a.ability.name
                  .split('-')
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}
              </Text>

              {a.is_hidden && (
                <Text style={[styles.hiddenLabel, { color: theme.text.secondary }]}> (Hidden)</Text>
              )}
            </View>
          ))}
        </View>

        <Pressable
          style={[styles.statsButton, { backgroundColor }]}
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

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    opacity: 0.9,
  },

  header: {
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  pokemonId: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-end',
    letterSpacing: 1,
  },

  pokemonName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },

  typesContainer: {
    flexDirection: 'row',
    marginTop: 16,
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
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },

  artwork: {
    width: 240,
    height: 240,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  content: {
    padding: 24,
    marginTop: -40,
  },

  infoRow: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 28,
  },

  infoItem: {
    flex: 1,
    alignItems: 'center',
  },

  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.3,
  },

  divider: {
    width: 1,
    opacity: 0.5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 12,
  },

  statBarContainer: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
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
    shadowColor: '#000',
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
    fontSize: 12,
    fontStyle: 'italic',
    marginLeft: 2,
  },

  contentContainer: {
    paddingBottom: 70,
  },

  statsButton: {
    marginTop: 32,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  statsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

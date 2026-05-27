import { statLabels } from '@/constants/pokemon';
import { useFavorites } from '@/lib/favorites';
import { fetchPokemonDetails } from '@/lib/pokeapi';
import Colors, { statColors, typeColors } from '@/theme/colors';
import type { PokemonDetails } from '@/types/pokemon';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 420;
const PARALLAX_FACTOR_BG = 0.4;
const PARALLAX_FACTOR_ART = 0.65;

function PokemonDetailsSkeleton({ theme }: { theme: typeof Colors.light }) {
  const opacity = useSharedValue(0.3);
  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.7, { duration: 800 }), -1, true);
  }, [opacity]);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const placeholderBg = { backgroundColor: theme.surface?.border || '#E0E0E0' };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.surface?.secondary || '#F0F0F0',
            shadowColor: theme.shadow?.medium || '#000',
          },
        ]}
      >
        <View style={styles.headerTop}>
          <Animated.View
            style={[animatedStyle, placeholderBg, { width: 50, height: 18, borderRadius: 4 }]}
          />
          <Animated.View
            style={[animatedStyle, placeholderBg, { width: 28, height: 28, borderRadius: 14 }]}
          />
        </View>
        <Animated.View
          style={[
            animatedStyle,
            placeholderBg,
            { width: 160, height: 36, marginTop: 16, marginBottom: 16, borderRadius: 8 },
          ]}
        />
        <View style={styles.typesContainer}>
          <Animated.View
            style={[animatedStyle, placeholderBg, { width: 70, height: 28, borderRadius: 14 }]}
          />
          <Animated.View
            style={[animatedStyle, placeholderBg, { width: 70, height: 28, borderRadius: 14 }]}
          />
        </View>
        <Animated.View
          style={[styles.artwork, animatedStyle, placeholderBg, { borderRadius: 100 }]}
        />
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
            <Animated.View
              style={[
                animatedStyle,
                placeholderBg,
                { width: 60, height: 20, marginBottom: 6, borderRadius: 4 },
              ]}
            />
            <Animated.View
              style={[animatedStyle, placeholderBg, { width: 40, height: 12, borderRadius: 3 }]}
            />
          </View>
          <View style={[styles.divider, { backgroundColor: theme.surface?.border || '#E0E0E0' }]} />
          <View style={styles.infoItem}>
            <Animated.View
              style={[
                animatedStyle,
                placeholderBg,
                { width: 60, height: 20, marginBottom: 6, borderRadius: 4 },
              ]}
            />
            <Animated.View
              style={[animatedStyle, placeholderBg, { width: 40, height: 12, borderRadius: 3 }]}
            />
          </View>
        </View>
        <Animated.View
          style={[
            animatedStyle,
            placeholderBg,
            { width: 100, height: 22, marginBottom: 20, borderRadius: 4 },
          ]}
        />
        <View style={styles.statsContainer}>
          {[1, 2, 3, 4, 5, 6].map(index => (
            <View key={index} style={styles.statRow}>
              <Animated.View
                style={[animatedStyle, placeholderBg, { width: 50, height: 14, borderRadius: 3 }]}
              />
              <Animated.View
                style={[
                  animatedStyle,
                  placeholderBg,
                  { width: 30, height: 14, marginLeft: 15, marginRight: 12, borderRadius: 3 },
                ]}
              />
              <View
                style={[
                  styles.statBarContainer,
                  { backgroundColor: theme.surface?.secondary || '#F0F0F0' },
                ]}
              >
                <Animated.View
                  style={[animatedStyle, placeholderBg, { width: '100%', height: '100%' }]}
                />
              </View>
            </View>
          ))}
        </View>
        <Animated.View
          style={[
            animatedStyle,
            placeholderBg,
            { width: 90, height: 22, marginBottom: 20, borderRadius: 4 },
          ]}
        />
        <View style={styles.abilitiesContainer}>
          {[1, 2].map(index => (
            <Animated.View
              key={index}
              style={[
                styles.abilityBadge,
                animatedStyle,
                {
                  backgroundColor: theme.surface?.primary || '#FFFFFF',
                  shadowColor: theme.shadow?.default || '#000',
                  width: 100,
                  height: 42,
                },
              ]}
            />
          ))}
        </View>
        <Animated.View
          style={[
            styles.statsButton,
            animatedStyle,
            {
              backgroundColor: theme.surface?.secondary || '#F0F0F0',
              shadowColor: 'transparent',
              height: 54,
              marginTop: 32,
            },
          ]}
        />
      </View>
    </ScrollView>
  );
}

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { isFavorite, toggleFavorite } = useFavorites();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerBgStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [HEADER_HEIGHT * PARALLAX_FACTOR_BG, 0, -HEADER_HEIGHT * PARALLAX_FACTOR_BG],
      'clamp'
    );
    const scale = interpolate(scrollY.value, [-150, 0], [1.2, 1], 'clamp');
    return { transform: [{ translateY }, { scale }] };
  });

  const circle1Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT * 0.25],
      'clamp'
    );
    const translateX = interpolate(scrollY.value, [0, HEADER_HEIGHT], [0, 20], 'clamp');
    return { transform: [{ translateY }, { translateX }] };
  });

  const circle2Style = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT * 0.15],
      'clamp'
    );
    const translateX = interpolate(scrollY.value, [0, HEADER_HEIGHT], [0, -15], 'clamp');
    return { transform: [{ translateY }, { translateX }] };
  });

  const artworkStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [HEADER_HEIGHT * PARALLAX_FACTOR_ART * 0.3, 0, -HEADER_HEIGHT * PARALLAX_FACTOR_ART * 0.4],
      'clamp'
    );
    const scale = interpolate(scrollY.value, [-150, 0, 150], [1.3, 1, 0.85], 'clamp');
    return { transform: [{ translateY }, { scale }] };
  });

  const stickyHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_HEIGHT - 80, HEADER_HEIGHT - 20],
      [0, 1],
      'clamp'
    );
    const translateY = interpolate(
      scrollY.value,
      [HEADER_HEIGHT - 80, HEADER_HEIGHT - 20],
      [-20, 0],
      'clamp'
    );
    return { opacity, transform: [{ translateY }] };
  });

  const headerContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0], 'clamp');
    const translateY = interpolate(scrollY.value, [0, 120], [0, -15], 'clamp');
    return { opacity, transform: [{ translateY }] };
  });

  useEffect(() => {
    if (!id) return;
    fetchPokemonDetails(id)
      .then(data => setPokemon(data))
      .catch(err => setError(err.message || 'Failed to load Pokémon'))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) return null;
  if (loading) return <PokemonDetailsSkeleton theme={theme} />;
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
  const darkerBg = shadeColor(backgroundColor, -20);
  const artworkUrl =
    pokemon.sprites.other['official-artwork'].front_default ??
    pokemon.sprites.front_default ??
    undefined;
  const pokemonDisplayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View
        style={[styles.stickyHeader, { backgroundColor }, stickyHeaderStyle]}
        pointerEvents="none"
      >
        <Text style={styles.stickyHeaderText}>{pokemonDisplayName}</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headerClip}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor }]} />

          <Animated.View style={[StyleSheet.absoluteFill, headerBgStyle]}>
            <Animated.View
              style={[styles.decorCircleLarge, { backgroundColor: darkerBg }, circle1Style]}
            />
            <Animated.View
              style={[styles.decorCircleMedium, { backgroundColor: darkerBg }, circle2Style]}
            />
          </Animated.View>

          <Animated.View style={[styles.header, headerContentStyle]}>
            <View style={styles.headerTop}>
              <Text
                style={[
                  styles.pokemonId,
                  { color: theme.transparent?.white70 || 'rgba(255,255,255,0.7)' },
                ]}
              >
                #{String(pokemon.id).padStart(3, '0')}
              </Text>
              <Pressable
                hitSlop={10}
                onPress={() => toggleFavorite({ id: pokemon.id, name: pokemon.name })}
              >
                <Ionicons
                  name={isFavorite(pokemon.id) ? 'heart' : 'heart-outline'}
                  size={28}
                  color={theme.white || '#FFFFFF'}
                />
              </Pressable>
            </View>

            <Animated.Text entering={FadeInDown.duration(400)} style={styles.pokemonName}>
              {pokemonDisplayName}
            </Animated.Text>

            <View style={styles.typesContainer}>
              {pokemon.types.map(t => (
                <Animated.View
                  key={t.type.name}
                  entering={FadeIn.delay(200).duration(400)}
                  style={[
                    styles.typeBadge,
                    { backgroundColor: theme.transparent?.white25 || 'rgba(255,255,255,0.25)' },
                  ]}
                >
                  <Text style={styles.typeText}>{t.type.name.toUpperCase()}</Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(300).duration(600)} style={styles.artworkWrapper}>
            <Animated.Image
              source={{ uri: artworkUrl }}
              style={[styles.artwork, artworkStyle]}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <View style={styles.content}>
          <Animated.View
            entering={FadeInDown.delay(200).duration(400)}
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
            <View
              style={[styles.divider, { backgroundColor: theme.surface?.border || '#E0E0E0' }]}
            />
            <View style={styles.infoItem}>
              <Text style={[styles.infoValue, { color: theme.text?.primary || '#000000' }]}>
                {(pokemon.height / 10).toFixed(1)} m
              </Text>
              <Text style={[styles.infoLabel, { color: theme.text?.secondary || '#666666' }]}>
                Height
              </Text>
            </View>
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(300).duration(400)}
            style={[styles.sectionTitle, { color: theme.text?.primary || '#000000' }]}
          >
            Base Stats
          </Animated.Text>

          <Animated.View
            entering={FadeInDown.delay(400).duration(400)}
            style={styles.statsContainer}
          >
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
                      { backgroundColor: theme.surface?.secondary || '#F0F0F0' },
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
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(500).duration(400)}
            style={[styles.sectionTitle, { color: theme.text?.primary || '#000000' }]}
          >
            Abilities
          </Animated.Text>

          <Animated.View
            entering={FadeInDown.delay(600).duration(400)}
            style={styles.abilitiesContainer}
          >
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
                    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
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
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(700).duration(400)}>
            <Pressable
              style={[
                styles.statsButton,
                { backgroundColor, shadowColor: theme.shadow?.medium || '#000' },
              ]}
              onPress={() => router.push({ pathname: '/pokemon-stats-modal', params: { id } })}
            >
              <Text style={styles.statsButtonText}>View Detailed Stats</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function shadeColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
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
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 56,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  stickyHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: '#FFFFFF',
  },
  headerClip: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 10,
  },
  decorCircleLarge: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -60,
    right: -60,
    opacity: 0.45,
  },
  decorCircleMedium: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    bottom: 30,
    left: -40,
    opacity: 0.35,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 220,
    zIndex: 2,
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
    marginBottom: 24,
    gap: 12,
  },
  typeBadge: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 25,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  artworkWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  artwork: {
    width: 200,
    height: 200,
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
    marginBottom: 4,
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

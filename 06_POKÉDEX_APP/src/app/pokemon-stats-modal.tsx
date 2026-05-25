import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { statLabels } from '../constants/pokemon';
import { fetchPokemonDetails } from '../lib/pokeapi';
import colors, { statColors, typeColors } from '../theme/colors';
import type { PokemonDetails } from '../types/pokemon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function StatCircle({
  label,
  value,
  maxValue,
  color,
  delay,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  delay: number;
}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  const progress = useSharedValue(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    progress.value = withDelay(delay, withSpring(percentage, { damping: 15 }));
  }, [percentage, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={[styles.statCircleContainer, { backgroundColor: theme.surface.primary }]}>
      <View style={styles.statCircleHeader}>
        <Text style={[styles.statCircleLabel, { color: theme.text.primary }]}>{label}</Text>
        <Text style={[styles.statCircleValue, { color }]}>{value}</Text>
      </View>
      <View style={[styles.statCircleBarBg, { backgroundColor: theme.surface.secondary }]}>
        <Animated.View style={[styles.statCircleBar, { backgroundColor: color }, animatedStyle]} />
      </View>
      <Text style={[styles.statCirclePercentage, { color: theme.text.secondary }]}>
        {percentage.toFixed(0)}% of max
      </Text>
    </View>
  );
}

function StatComparison({
  stat1,
  stat2,
  label1,
  label2,
  color,
}: {
  stat1: number;
  stat2: number;
  label1: string;
  label2: string;
  color: string;
}) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;

  const total = stat1 + stat2;
  const ratio1 = total > 0 ? (stat1 / total) * 100 : 50;
  const ratio2 = total > 0 ? (stat2 / total) * 100 : 50;

  return (
    <View style={[styles.comparisonContainer, { backgroundColor: theme.surface.primary }]}>
      <View style={styles.comparisonHeader}>
        <Text style={[styles.comparisonLabel, { color: theme.text.primary }]}>{label1}</Text>
        <Text style={[styles.comparisonLabel, { color: theme.text.primary }]}>{label2}</Text>
      </View>
      <View style={styles.comparisonBar}>
        <View style={[styles.comparisonSegment, { width: `${ratio1}%`, backgroundColor: color }]}>
          <Text style={styles.comparisonValue}>{stat1}</Text>
        </View>
        <View
          style={[styles.comparisonSegment, { width: `${ratio2}%`, backgroundColor: `${color}99` }]}
        >
          <Text style={styles.comparisonValue}>{stat2}</Text>
        </View>
      </View>
    </View>
  );
}

const PokemonStatsModal = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetchPokemonDetails(id)
      .then(setPokemon)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={'#666'} />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centered}>
        <Text style={[styles.errorText, { color: theme.text.error }]}>
          Failed to load Pokemon stats
        </Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const themeColor = typeColors[primaryType] || typeColors.normal;

  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const avgStat = totalStats / pokemon.stats.length;

  const attack = pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
  const defense = pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0;
  const spAttack = pokemon.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0;
  const spDefense = pokemon.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0;
  const hp = pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
  const speed = pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;

  const physicalTotal = attack + defense;
  const specialTotal = spAttack + spDefense;
  const offensiveTotal = attack + spAttack;
  const defensiveTotal = defense + spDefense + hp;

  const getStatTier = (total: number) => {
    if (total >= 600) return { label: 'Legendary', color: '#FFD700' };
    if (total >= 500) return { label: 'Excellent', color: '#4CAF50' };
    if (total >= 400) return { label: 'Good', color: '#2196F3' };
    if (total >= 300) return { label: 'Average', color: '#FF9800' };
    return { label: 'Below Average', color: '#F44336' };
  };

  const tier = getStatTier(totalStats);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Drag Handle */}
      <View style={styles.handleContainer}>
        <View style={[styles.handle, { backgroundColor: theme.surface.border }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        overScrollMode="always"
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={[styles.typeIndicator, { backgroundColor: themeColor + '20' }]} />
          <Text style={[styles.title, { color: theme.text.primary }]}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={[styles.subtitle, { color: theme.text.secondary }]}>
            Detailed Stats Analysis
          </Text>
        </View>

        {/* Total Stats Card */}
        <View
          style={[
            styles.totalStatsCard,
            { borderColor: themeColor, backgroundColor: theme.surface.primary },
          ]}
        >
          <Text style={[styles.cardTitle, { color: theme.text.secondary }]}>Base Stat Total</Text>
          <Text style={[styles.totalValue, { color: themeColor }]}>{totalStats}</Text>
          <View style={[styles.tierBadge, { backgroundColor: tier.color }]}>
            <Text style={styles.tierText}>{tier.label}</Text>
          </View>
          <Text style={[styles.avgText, { color: theme.text.secondary }]}>
            Average: {avgStat.toFixed(1)} per stat
          </Text>
        </View>

        {/* Individual Stats Section */}
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Individual Stats</Text>
        <View style={styles.statsGrid}>
          {pokemon.stats.map((stat, index) => (
            <StatCircle
              key={stat.stat.name}
              label={statLabels[stat.stat.name] || stat.stat.name}
              value={stat.base_stat}
              maxValue={255}
              color={statColors[stat.stat.name] || themeColor}
              delay={index * 100}
            />
          ))}
        </View>

        {/* Stat Comparisons Section */}
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Stat Comparisons</Text>

        <StatComparison
          stat1={physicalTotal}
          stat2={specialTotal}
          label1="Physical"
          label2="Special"
          color={themeColor}
        />

        <StatComparison
          stat1={offensiveTotal}
          stat2={defensiveTotal}
          label1="Offensive"
          label2="Defensive"
          color={themeColor}
        />

        <StatComparison
          stat1={hp + speed}
          stat2={attack + defense + spAttack + spDefense}
          label1="Utility"
          label2="Combat"
          color={themeColor}
        />

        {/* Battle Insights Section */}
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Battle Insights</Text>
        <View style={styles.insightsContainer}>
          {speed >= 100 && (
            <View style={[styles.insightBadge, { backgroundColor: statColors.speed }]}>
              <Text style={styles.insightText}>⚡ Speed Demon</Text>
            </View>
          )}
          {hp >= 100 && (
            <View style={[styles.insightBadge, { backgroundColor: statColors.hp }]}>
              <Text style={styles.insightText}>💪 Tank</Text>
            </View>
          )}
          {attack >= 100 && (
            <View style={[styles.insightBadge, { backgroundColor: statColors.attack }]}>
              <Text style={styles.insightText}>⚔️ Physical Sweeper</Text>
            </View>
          )}
          {spAttack >= 100 && (
            <View style={[styles.insightBadge, { backgroundColor: statColors['special-attack'] }]}>
              <Text style={styles.insightText}>🔮 Special Sweeper</Text>
            </View>
          )}
          {defense >= 100 && (
            <View style={[styles.insightBadge, { backgroundColor: statColors.defense }]}>
              <Text style={styles.insightText}>🛡️ Physical Wall</Text>
            </View>
          )}
          {spDefense >= 100 && (
            <View style={[styles.insightBadge, { backgroundColor: statColors['special-defense'] }]}>
              <Text style={styles.insightText}>🔒 Special Wall</Text>
            </View>
          )}
          {pokemon.stats.every(s => s.base_stat >= 80) && (
            <View style={[styles.insightBadge, { backgroundColor: '#9C27B0' }]}>
              <Text style={styles.insightText}>⭐ Well Rounded</Text>
            </View>
          )}
        </View>

        {/* Close Button */}
        <Pressable
          style={[styles.closeButton, { backgroundColor: themeColor }]}
          onPress={() => router.back()}
          android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingTop: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
    position: 'relative',
  },
  typeIndicator: {
    position: 'absolute',
    width: SCREEN_WIDTH - 80,
    height: 80,
    borderRadius: 40,
    top: -20,
    opacity: 0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  totalStatsCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 64,
    fontWeight: '900',
    marginVertical: 8,
    letterSpacing: 2,
  },
  tierBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
    marginVertical: 8,
  },
  tierText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#fff',
    letterSpacing: 0.5,
  },
  avgText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  statsGrid: {
    gap: 14,
    marginBottom: 28,
  },
  statCircleContainer: {
    borderRadius: 20,
    padding: 18,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statCircleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statCircleLabel: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'capitalize',
  },
  statCircleValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  statCircleBarBg: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  statCircleBar: {
    height: '100%',
    borderRadius: 5,
  },
  statCirclePercentage: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
    fontWeight: '500',
  },
  comparisonContainer: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  comparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  comparisonLabel: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  comparisonBar: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 10,
    overflow: 'hidden',
  },
  comparisonSegment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  comparisonValue: {
    fontWeight: '800',
    fontSize: 15,
    color: '#fff',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 32,
  },
  insightBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  insightText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#fff',
    letterSpacing: 0.3,
  },
  closeButton: {
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    fontWeight: '800',
    fontSize: 17,
    color: '#fff',
    letterSpacing: 0.5,
  },
});

export default PokemonStatsModal;

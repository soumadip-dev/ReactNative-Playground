import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/src/constants/colors';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PokemonDetailsScreenRouteProp } from '@/src/navigation/types';
import { TypeBadge } from '@/src/components/type-badge';
import { getTypeColor } from '../../constants/types';
import { StatBar } from '@/src/components/statBar';

const PokemonDetailScreen = () => {
  const route = useRoute<PokemonDetailsScreenRouteProp>();
  const { pokemon } = route.params;

  const navigator = useNavigation();

  const mainType = pokemon.types[0].type.name;
  const accentColor = getTypeColor(mainType);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: COLORS.card }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.navBar}>
              <Ionicons
                name="arrow-back"
                size={26}
                color={COLORS.text}
                onPress={() => navigator.goBack()}
              />

              <Text style={styles.headerId}>#{String(pokemon.id).padStart(3, '0')}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: pokemon.sprites.other['official-artwork'].front_default,
                }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>

          <View style={styles.typeContainer}>
            {pokemon.types.map(t => (
              <TypeBadge key={t.type.name} type={t.type.name} size="large" />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accentColor }]}>About</Text>

            <View style={styles.row}>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Ionicons name="scale-outline" size={20} color={COLORS.text} />
                </View>

                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Ionicons name="resize-outline" size={20} color={COLORS.text} />
                </View>

                <Text style={styles.statLabel}>Height</Text>
                <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
              </View>

              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Ionicons name="flash-outline" size={20} color={COLORS.text} />
                </View>

                <Text style={styles.statLabel}>Moves</Text>
                <Text style={styles.statValue}>
                  {pokemon.abilities[0]?.ability.name.charAt(0).toUpperCase() +
                    pokemon.abilities[0]?.ability.name.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accentColor }]}>Base Stats</Text>

            {pokemon.stats.map(stat => (
              <StatBar
                key={stat.stat.name}
                label={stat.stat.name.replace('-', ' ')}
                value={stat.base_stat}
                color={accentColor}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PokemonDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 32,
  },

  header: {
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },

  safeArea: {
    flex: 1,
  },

  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginTop: 8,
  },

  headerId: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.6,
  },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 22,
  },

  image: {
    width: 260,
    height: 260,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },

  name: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    textAlign: 'center',
    marginBottom: 16,
  },

  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 32,
  },

  section: {
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  statIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  statLabel: {
    color: COLORS.subtext,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 5,
  },

  statValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    textAlign: 'center',
  },
});

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { useFavorites } from '@/lib/favorites';
import { getPokemonSpriteUrl } from '@/lib/pokeapi';
import Colors from '@/theme/colors';

export default function Favorites() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const { favorites, loading, refresh, toggleFavorite } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  // Loading state
  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  // Empty favorites state
  if (favorites.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <Ionicons name="heart-outline" size={64} color={theme.text.secondary} />

        <Text style={[styles.emptyText, { color: theme.text.primary }]}>No favorites yet</Text>

        <Text style={[styles.emptySubtext, { color: theme.text.secondary }]}>
          Tap the heart icon on a Pokémon
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <Pressable
          style={[
            styles.card,
            {
              backgroundColor: theme.surface.primary,
            },
          ]}
          onPress={() => router.push(`/pokedex/${item.id}`)}
        >
          <Image
            source={{
              uri: getPokemonSpriteUrl(item.id.toString()),
            }}
            style={styles.sprite}
          />

          <View style={styles.info}>
            <Text
              style={[
                styles.pokemonId,
                {
                  color: theme.text.secondary,
                },
              ]}
            >
              #{String(item.id).padStart(3, '0')}
            </Text>

            <Text
              style={[
                styles.pokemonName,
                {
                  color: theme.text.primary,
                },
              ]}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
          </View>

          <Pressable onPress={() => toggleFavorite(item)} hitSlop={10} style={styles.removeButton}>
            <Ionicons name="heart" size={24} color="#E3350D" />
          </Pressable>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    padding: 20,
  },

  emptyText: {
    marginTop: 16,

    fontSize: 18,
    fontWeight: '600',
  },

  emptySubtext: {
    marginTop: 8,

    fontSize: 14,

    textAlign: 'center',
  },

  listContent: {
    padding: 16,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 14,
    padding: 14,

    borderRadius: 16,
  },

  sprite: {
    width: 70,
    height: 70,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  pokemonId: {
    fontSize: 12,
  },

  pokemonName: {
    marginTop: 4,

    fontSize: 18,
    fontWeight: '700',
  },

  removeButton: {
    padding: 8,
  },
});

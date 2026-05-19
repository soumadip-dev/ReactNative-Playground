import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { fetchPokemonList, getPokemonId, getPokemonSpriteUrl } from '@/lib/pokeapi';

import { Pokemon } from '@/types/pokemon';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import Colors from '@/theme/colors';

export default function Pokedex() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const LIMIT = 30;

  useEffect(() => {
    fetchPokemonList(LIMIT, 0)
      .then(data => {
        setPokemon(data);
        setOffset(LIMIT);
      })
      .catch(error => {
        setError(error.message || 'Failed to load Pokémon');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const currentOffset = offset;

      const newPokemon = await fetchPokemonList(LIMIT, currentOffset);

      if (newPokemon.length < LIMIT) {
        setHasMore(false);
      }

      setPokemon(prevPokemon => {
        const existingNames = new Set(prevPokemon.map(p => p.name));

        const filteredPokemon = newPokemon.filter(p => !existingNames.has(p.name));

        return [...prevPokemon, ...filteredPokemon];
      });

      setOffset(currentOffset + LIMIT);
    } catch (err) {
      console.error('Failed to load more Pokémon:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => {
      const id = getPokemonId(item.url);
      const spriteUrl = getPokemonSpriteUrl(id);

      return (
        <TouchableOpacity
          style={[
            styles.item,
            {
              backgroundColor: theme.surface.primary,
              borderColor: theme.surface.border,
            },
          ]}
          onPress={() => {
            router.push(`/pokedex/${id}`);
          }}
        >
          <Image source={{ uri: spriteUrl }} style={styles.sprite} />

          <Text style={[styles.name, { color: theme.text.primary }]}>
            #{id} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    },
    [router, theme]
  );

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text.error }]}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemon}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      contentContainerStyle={[styles.list, { backgroundColor: theme.background }]}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator style={styles.footer} color={theme.tint} /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    padding: 16,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
  },

  sprite: {
    width: 50,
    height: 50,
  },

  name: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
  },

  footer: {
    paddingVertical: 20,
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

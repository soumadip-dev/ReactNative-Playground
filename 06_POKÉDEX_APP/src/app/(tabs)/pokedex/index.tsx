import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { fetchPokemonList, getPokemonId, getPokemonSpriteUrl } from '@/lib/pokeapi';

import { Pokemon } from '@/types/pokemon';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export default function Pokedex() {
  const router = useRouter();

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          style={styles.item}
          onPress={() => {
            router.push(`/pokedex/${id}`);
          }}
        >
          <Image source={{ uri: spriteUrl }} style={styles.sprite} />

          <Text style={styles.name}>
            #{id} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </TouchableOpacity>
      );
    },
    [router]
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemon} // The array of items that the FlatList will display.
      renderItem={renderItem} //Function that tells FlatList how to display each item.
      keyExtractor={item => item.name} //Provides a unique key for every item.
      contentContainerStyle={styles.list} // Applies styling to the inner container of the list.
      onEndReached={loadMore} // Function called when the user scrolls near the bottom of the list.
      onEndReachedThreshold={0.5} // Controls how early onEndReached should trigger.
      ListFooterComponent={loadingMore ? <ActivityIndicator style={styles.footer} /> : null} //Adds a component at the bottom of the list.
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
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },

  sprite: {
    width: 50,
    height: 50,
  },

  name: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },

  footer: {
    paddingVertical: 20,
  },

  errorText: {
    fontSize: 16,
    color: '#E3350D',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

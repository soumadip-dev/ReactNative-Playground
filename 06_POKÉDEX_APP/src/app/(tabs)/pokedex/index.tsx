import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import PokemonListItem from '@/components/PokemonListItem';
import { useFavorites } from '@/lib/favorites';
import { fetchPokemonList, getPokemonId } from '@/lib/pokeapi';
import Colors from '@/theme/colors';
import type { Pokemon } from '@/types/pokemon';

const LIMIT = 30;

export default function Pokedex() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const { isFavorite, refresh } = useFavorites();

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  //* Debounce search input for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  //* Initial Pokémon fetch
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

  //* Load more Pokémon for infinite scrolling
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

  //* Filter Pokémon based on search query
  const filteredPokemon = useMemo(() => {
    if (!debouncedQuery.trim()) return pokemon;

    const query = debouncedQuery.toLowerCase().trim();

    return pokemon.filter(pokemon => {
      const id = getPokemonId(pokemon.url);
      const name = pokemon.name.toLowerCase();

      return name.includes(query) || id.toString().includes(query);
    });
  }, [pokemon, debouncedQuery]);

  //* Render each Pokémon card
  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => {
      const id = getPokemonId(item.url);
      // Check if current Pokémon is favorite
      const isFav = isFavorite(Number(id));

      return <PokemonListItem item={item} theme={theme} isFavorite={isFav} />;
    },
    [theme, isFavorite]
  );

  //* Loading state
  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  //* Error state
  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text.error }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <TextInput
          style={[
            styles.searchInput,
            {
              color: theme.text.primary,
              backgroundColor: theme.surface.primary,
              borderColor: theme.surface.border,
            },
          ]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name or number..."
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      ) : (
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.surface.primary,
              borderColor: theme.surface.border,
            },
          ]}
        >
          <TextInput
            style={[styles.input, { color: theme.text.primary }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name or number..."
            placeholderTextColor="#999"
            autoCapitalize="none"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={filteredPokemon}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        contentContainerStyle={[styles.list, { backgroundColor: theme.background }]}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={styles.footer} color={theme.tint} /> : null
        }
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={theme.text.secondary} />

            <Text style={[styles.emptyText, { color: theme.text.primary }]}>No Pokémon found</Text>

            <Text style={[styles.emptySubtext, { color: theme.text.secondary }]}>
              Try searching by Pokémon name or number
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchInput: {
    margin: 16,
    marginBottom: 0,

    paddingHorizontal: 18,
    paddingVertical: 14,

    borderRadius: 14,
    borderWidth: 1.5,

    fontSize: 16,
    fontWeight: '500',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    margin: 16,
    marginBottom: 0,

    paddingHorizontal: 16,
    paddingVertical: 2,

    borderRadius: 14,
    borderWidth: 1.5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },

  input: {
    flex: 1,

    paddingHorizontal: 4,
    paddingVertical: 12,

    fontSize: 16,
    fontWeight: '500',
  },

  list: {
    padding: 16,
    paddingTop: 8,
  },

  footer: {
    paddingVertical: 24,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  emptyText: {
    marginTop: 40,

    fontSize: 16,
    fontWeight: '500',

    textAlign: 'center',
    color: '#666',
  },

  emptySubtext: {
    marginTop: 8,

    fontSize: 14,
    lineHeight: 20,

    textAlign: 'center',
  },

  errorText: {
    paddingHorizontal: 20,

    fontSize: 16,
    fontWeight: '500',

    textAlign: 'center',
  },
});

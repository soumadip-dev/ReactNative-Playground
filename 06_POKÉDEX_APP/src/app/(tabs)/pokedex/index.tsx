import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { fetchPokemonList, getPokemonId, getPokemonSpriteUrl } from '@/lib/pokeapi';
import { Pokemon } from '@/types/pokemon';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const filteredPokemon = useMemo(() => {
    if (!debouncedQuery.trim()) return pokemon;

    const query = debouncedQuery.toLowerCase().trim();

    const filtered = pokemon.filter(pokemon => {
      const id = getPokemonId(pokemon.url);
      const name = pokemon.name.toLowerCase();

      return name.includes(query) || id.toString().includes(query);
    });

    return filtered;
  }, [pokemon, debouncedQuery]);

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
          placeholder="Search by name or number..."
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          value={searchQuery}
          onChangeText={setSearchQuery}
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
        data={filteredPokemon} // Array of Pokémon data displayed in the list
        renderItem={renderItem} // Function responsible for rendering each Pokémon item
        keyExtractor={item => item.name} // Provides a unique key for each list item
        contentContainerStyle={[styles.list, { backgroundColor: theme.background }]} // Styles applied to the FlatList content container
        onEndReached={loadMore} // Loads more Pokémon when the user scrolls near the end
        onEndReachedThreshold={0.5}
        // Triggers onEndReached when the user is within 50% of the bottom

        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={styles.footer} color={theme.tint} /> : null
        }
        // Displays a loading spinner at the bottom while fetching more data

        keyboardDismissMode="on-drag"
        // Dismisses the keyboard automatically when the user scrolls the list

        keyboardShouldPersistTaps="handled"
        // Allows taps on list items while properly handling keyboard dismissal

        ListEmptyComponent={<Text style={styles.emptyText}>No Pokémon found</Text>} // Component to display when the list is empty
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInput: {
    margin: 16,
    marginBottom: 0,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    fontSize: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    fontWeight: '500',
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
    paddingVertical: 12,
    paddingHorizontal: 4,
    fontSize: 16,
    fontWeight: '500',
  },

  list: {
    padding: 16,
    paddingTop: 8,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  sprite: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },

  name: {
    fontSize: 17,
    marginLeft: 14,
    fontWeight: '600',
    letterSpacing: -0.3,
  },

  footer: {
    paddingVertical: 24,
  },

  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    fontSize: 16,
    fontWeight: '500',
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '500',
  },
});

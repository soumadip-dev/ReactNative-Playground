import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Image,
  Pressable,
} from 'react-native';

export const pokemonTypeColors: Record<string, string> = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
};

export function getCardColor(typeOrTypes: string | string[]) {
  const primaryType = Array.isArray(typeOrTypes) ? typeOrTypes[0] : typeOrTypes;

  return pokemonTypeColors[primaryType?.toLowerCase()] || '#6B7280';
}

type Pokemon = {
  name: string;
  image: string;
  id: number;
  types: string[];
};

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonResponse = {
  results: PokemonListItem[];
};

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');

      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon');
      }

      const data: PokemonResponse = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async pokemon => {
          const response = await fetch(pokemon.url);
          const detailedPokemon = await response.json();

          return {
            id: detailedPokemon.id,
            name: detailedPokemon.name,
            image: detailedPokemon.sprites.other['official-artwork'].front_default,
            types: detailedPokemon.types.map((type: { type: { name: string } }) => type.type.name),
          };
        })
      );

      setPokemon(detailedPokemons);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error occurred');
      }

      setPokemon([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EF5350" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Pokemon }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/details',
          params: { name: item.name },
        })
      }
      style={[
        styles.card,
        {
          backgroundColor: getCardColor(item.types),
        },
      ]}
    >
      <View style={styles.idBadge}>
        <Text style={styles.idText}>#{String(item.id).padStart(3, '0')}</Text>
      </View>

      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.typesContainer}>
        {item.types.map(type => (
          <View key={type} style={styles.typeBadge}>
            <Text style={styles.typeText}>{type}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={pokemon}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },

  row: {
    justifyContent: 'space-between',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },

  errorText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
  },

  card: {
    flex: 1,
    margin: 8,
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 5,
  },

  idBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  idText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },

  image: {
    width: 110,
    height: 110,
    marginTop: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'capitalize',
    marginTop: 10,
    color: '#111827',
  },

  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },

  typeBadge: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },

  typeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
    color: '#111827',
  },
});

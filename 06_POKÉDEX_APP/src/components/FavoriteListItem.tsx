import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { getPokemonSpriteUrl } from '@/lib/pokeapi';
import Colors from '@/theme/colors';
import type { PokemonDetails } from '@/types/pokemon';

type ThemeType = typeof Colors.light;

interface FavoriteListItemProps {
  item: Pick<PokemonDetails, 'id' | 'name'>;
  theme: ThemeType;
  onToggleFavorite: (item: Pick<PokemonDetails, 'id' | 'name'>) => void;
}

export default function FavoriteListItem({ item, theme, onToggleFavorite }: FavoriteListItemProps) {
  const router = useRouter();

  return (
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

      <Pressable onPress={() => onToggleFavorite(item)} hitSlop={10} style={styles.removeButton}>
        <Ionicons name="heart" size={24} color="#E3350D" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

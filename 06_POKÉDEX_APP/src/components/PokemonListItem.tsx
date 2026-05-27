import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { getPokemonId, getPokemonSpriteUrl } from '@/lib/pokeapi';
import Colors from '@/theme/colors';
import { Pokemon } from '@/types/pokemon';

type ThemeType = typeof Colors.light;

interface PokemonListItemProps {
  item: Pokemon;
  theme: ThemeType;
  isFavorite: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function PokemonListItem({ item, theme, isFavorite }: PokemonListItemProps) {
  const router = useRouter();
  const id = getPokemonId(item.url);
  const spriteUrl = getPokemonSpriteUrl(id);

  return (
    <AnimatedTouchableOpacity
      entering={FadeInDown.duration(400).springify()}
      style={[
        styles.item,
        {
          backgroundColor: theme.surface.primary,
          borderColor: isFavorite ? '#FFD700' : theme.surface.border,
        },
        isFavorite && styles.favoriteItem,
      ]}
      onPress={() => {
        router.push(`/pokedex/${id}`);
      }}
    >
      <Image source={{ uri: spriteUrl }} style={styles.sprite} />

      <Text style={[styles.name, { color: theme.text.primary }]}>
        #{id} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>

      {/* Favorite Heart Icon */}
      {isFavorite && (
        <View style={styles.starContainer}>
          <Ionicons name="heart" size={20} color="#ff8800" />
        </View>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 12,
    padding: 14,

    borderRadius: 16,
    borderWidth: 1.5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,

    elevation: 1,
  },

  favoriteItem: {
    borderWidth: 1.5,
  },

  starContainer: {
    marginLeft: 'auto',
    paddingLeft: 8,
  },

  sprite: {
    width: 56,
    height: 56,

    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },

  name: {
    marginLeft: 14,

    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
});

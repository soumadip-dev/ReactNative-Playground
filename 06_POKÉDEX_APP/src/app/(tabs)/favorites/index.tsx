import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import FavoriteListItem from '@/components/FavoriteListItem';
import { useFavorites } from '@/lib/favorites';
import Colors from '@/theme/colors';

export default function Favorites() {
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
        <FavoriteListItem item={item} theme={theme} onToggleFavorite={toggleFavorite} />
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
});

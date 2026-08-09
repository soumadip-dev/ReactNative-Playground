import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '@/src/constants/colors';
import AppHeader from '@/src/components/app-header';
import { HomeScreenNavigationProp } from '@/src/navigation/types';
import PokemonCard from '@/src/components/pokemon-card';
import { getPokemonList, PokemonDetails, PokemonRef } from '@/src/api/pokemon';

const PokemonListScreen = () => {
  const navigator = useNavigation<HomeScreenNavigationProp>();

  const [list, setList] = useState<PokemonRef[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getPokemonList(20, offset);

      setList(prev => [...prev, ...data.results]);

      setOffset(prev => prev + 20);

      if (!data.next) setHasMore(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handlePress = (pokemon: PokemonDetails) => {
    navigator.navigate('PokemonDetails', { pokemon });
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Full List" />
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} url={item.url} onPress={handlePress} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.content}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color={COLORS.accentEmerald} /> : null
        }
      />
    </View>
  );
};

export default PokemonListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
});

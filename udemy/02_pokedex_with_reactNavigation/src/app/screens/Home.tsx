import { useEffect, useMemo, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { getPokemonByType, getPokemonList, PokemonDetails, PokemonRef } from '@/src/api/pokemon';

import AppHeader from '@/src/components/app-header';
import FilterChips from '@/src/components/filter-chips';
import PokemonCard from '@/src/components/pokemon-card';
import SearchInput from '@/src/components/search-input';

import { COLORS } from '@/src/constants/colors';
import { HomeScreenNavigationProp } from '@/src/navigation/types';

const PAGE_SIZE = 20;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Loading state
  const [loading, setLoading] = useState(true);

  // Stores the complete Pokémon list fetched from the API
  const [masterList, setMasterList] = useState<PokemonRef[]>([]);

  // Search and filter states
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Controls pagination for infinite scrolling
  const [page, setPage] = useState(1);

  // Refetch Pokémon whenever the selected type changes
  useEffect(() => {
    fetchData();
  }, [selectedType]);

  //* Fetch Pokémon based on the selected type. If no type is selected, fetch the complete list.
  const fetchData = async () => {
    try {
      setLoading(true);
      setPage(1);

      if (selectedType) {
        const list = await getPokemonByType(selectedType);
        setMasterList(list);
      } else {
        const list = await getPokemonList(1000, 0);
        setMasterList(list.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //* Filter Pokémon by search text. useMemo avoids unnecessary filtering on every render.
  const filteredList = useMemo(() => {
    if (!searchText) return masterList;

    return masterList.filter(pokemon => pokemon.name.includes(searchText.toLowerCase()));
  }, [masterList, searchText]);

  //* returns only the Pokémon that should currently be visible.
  const displayList = useMemo(() => {
    return filteredList.slice(0, page * PAGE_SIZE);
  }, [filteredList, page]);

  //* Navigate to the details screen
  const handleCardPress = (pokemon: PokemonDetails) => {
    navigation.navigate('PokemonDetails', { pokemon });
  };

  //* Load the next page when the user reaches the end of the list
  const loadMore = () => {
    if (displayList.length < filteredList.length) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <AppHeader title="Pokédex" showLogo />

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search Pokemon..."
            onClear={() => setSearchText('')}
          />
        </View>

        <View style={styles.filterContainer}>
          <FilterChips selectedType={selectedType} onSelectType={setSelectedType} />
        </View>

        {loading && page === 1 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={COLORS.accentEmerald} />
          </View>
        ) : (
          <FlatList
            data={displayList}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PokemonCard name={item.name} url={item.url} onPress={handleCardPress} />
            )}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
  },

  searchContainer: {
    padding: 16,
    paddingBottom: 0,
  },

  filterContainer: {
    marginTop: 8,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});

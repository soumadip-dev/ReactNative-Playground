import { getDB } from '@/db';
import { useCallback, useEffect, useState } from 'react';

export interface FavoritePokemon {
  id: number;
  name: string;
}

async function getFavorites(): Promise<FavoritePokemon[]> {
  try {
    const db = await getDB();

    const result = await db.getAllAsync<FavoritePokemon>(
      'SELECT * FROM favorites ORDER BY created_at DESC'
    );

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function addToFavorite(favorite: FavoritePokemon) {
  try {
    const db = await getDB();

    await db.runAsync(
      'INSERT OR REPLACE INTO favorites (id, name, created_at) VALUES(?,?,?);',
      favorite.id,
      favorite.name,
      new Date().toISOString()
    );
  } catch (error) {
    console.error(error);
  }
}

async function removeFromFavorite(id: number) {
  try {
    const db = await getDB();

    await db.runAsync('DELETE FROM favorites WHERE id = ?;', id);
  } catch (error) {
    console.error(error);
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await getFavorites();
    setFavorites(data);
  }, []);

  useEffect(() => {
    refresh().finally(() => {
      setLoading(false);
    });
  }, [refresh]);

  const isFavorite = useCallback(
    (id: number) => {
      return favorites.some(favorite => favorite.id === id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (pokemon: FavoritePokemon) => {
      if (isFavorite(pokemon.id)) {
        await removeFromFavorite(pokemon.id);
      } else {
        await addToFavorite(pokemon);
      }

      await refresh();
    },
    [isFavorite, refresh]
  );

  return {
    favorites,
    loading,
    refresh,
    isFavorite,
    toggleFavorite,
  };
}

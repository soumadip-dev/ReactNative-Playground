export interface PokemonRef {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonRef[];
}

export interface PokeonTypeEntry {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}
export interface PokemonDetails {
  id: number;
  name: string;
  types: PokeonTypeEntry[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
}
const BASE_URL = 'https://pokeapi.co/api/v2';

// * Fetches a paginated list of Pokémon from PokéAPI.
export const getPokemonList = async (
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }
  return response.json();
};

//* Fetches detailed information for a specific Pokémon by its name or Pokédex ID.
export const getPokemonDetails = async (nameOrId: string | number): Promise<PokemonDetails> => {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon details');
  }
  return response.json();
};

//* Fetches all Pokémon associated with a given elemental type (e.g., "fire", "water").
export const getPokemonByType = async (type: string): Promise<PokemonRef[]> => {
  const response = await fetch(`${BASE_URL}/type/${type}`);

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon by type');
  }

  const data = await response.json();

  // Extract and return the underlying pokemon references from the type response payload
  return data.pokemon.map((item: { pokemon: PokemonRef }) => item.pokemon);
};

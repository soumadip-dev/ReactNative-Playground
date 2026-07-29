import { COLORS, ColorKey } from './colors';

export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'steel',
  'fairy',
] as const;
// `as const`
// - Makes the array readonly.
// - Preserves each element as its exact string literal
//   instead of widening them to `string`.

// =====================================================

/*
`typeof POKEMON_TYPES` gives the readonly tuple type.

Adding `[number]` means:
"Give me the type of any element in this array."

Equivalent to:

type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  ...
*/
export type PokemonType = (typeof POKEMON_TYPES)[number];

// =====================================================

export const getTypeColor = (type: string): string => {
  // Normalize the input so "Fire", "FIRE", and "fire"
  // are all treated the same.
  const normalizedType = type.toLowerCase();

  // Check whether the normalized type exists
  // as a key in the COLORS object.
  if (normalizedType in COLORS) {
    // After the check above, we know this is a valid key.
    // `as ColorKey` tells TypeScript to treat it as one
    // of the allowed keys of the COLORS object.
    return COLORS[normalizedType as ColorKey];
  }

  // Fallback color for unknown Pokémon types.
  return COLORS.subtext;
};

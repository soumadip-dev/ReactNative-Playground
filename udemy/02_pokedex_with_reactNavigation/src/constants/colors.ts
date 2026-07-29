export const COLORS = {
  background: '#18181b', // zinc-900
  card: '#27272a', // zinc-800
  text: '#fafafa', // zinc-50
  subtext: '#a1a1aa', // zinc-400
  border: '#3f3f46', // zinc-700
  accentYellow: '#facc15', // yellow-400
  accentEmerald: '#34d399', // emerald-400

  // Pokémon type colors
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  steel: '#B7B7CE',
  fairy: '#D685AD',
} as const;
// `as const`
// - Makes the object readonly (properties cannot be changed).
// - Preserves the exact literal values instead of widening them to `string`.

// ====================================================

/*
`typeof` (in a type position) creates a TypeScript type
from the existing variable.

Equivalent to:

type ColorPalette = {
  readonly background: "#18181b";
  readonly card: "#27272a";
  readonly fire: "#EE8130";
  readonly water: "#6390F0";
  ...
}
*/
export type ColorPalette = typeof COLORS;

// ====================================================

/*
`keyof` creates a union of all property names (keys)
of an object type.

Equivalent to:

type ColorKey =
  | "background"
  | "card"
  | "text"
  | "subtext"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  ...
*/
export type ColorKey = keyof ColorPalette;

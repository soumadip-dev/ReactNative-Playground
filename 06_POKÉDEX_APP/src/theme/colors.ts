const tintColorLight = '#FF3B5C';
const tintColorDark = '#FF7096';

export default {
  light: {
    background: '#F5F2F0',

    text: {
      primary: '#0A0A0F',
      secondary: '#7A7A85',
      error: '#FF4D4F',
    },

    surface: {
      primary: '#FFFFFF',
      secondary: '#F0EDEB',
      border: '#EAE7E4',
    },

    white: '#FFFFFF',

    transparent: {
      white25: 'rgba(255,255,255,0.25)',
      white70: 'rgba(255,255,255,0.7)',
      black10: 'rgba(0,0,0,0.08)',
    },

    tint: tintColorLight,
    gradientAccent: '#FF3B5C',
  },

  dark: {
    background: '#0A0A0F',

    text: {
      primary: '#F5F5F7',
      secondary: '#B0B0BB',
      error: '#FF7878',
    },

    surface: {
      primary: '#111118',
      secondary: '#1C1C27',
      border: '#2A2A3A',
    },

    white: '#FFFFFF',

    transparent: {
      white25: 'rgba(255,255,255,0.25)',
      white70: 'rgba(255,255,255,0.7)',
      black10: 'rgba(0,0,0,0.25)',
    },

    tint: tintColorDark,
    gradientAccent: '#FF7096',
  },
};

export const typeColors: Record<string, string> = {
  normal: '#B8B48A',
  fire: '#FF8A4C',
  water: '#5DA9FF',
  electric: '#FFD95A',
  grass: '#6ED96E',
  ice: '#7EDDDD',
  fighting: '#D94A3A',
  poison: '#B05CB0',
  ground: '#D9B96E',
  flying: '#9C8CFF',
  psychic: '#FF6FA5',
  bug: '#A6C63A',
  rock: '#C1A84A',
  ghost: '#7A63B8',
  dragon: '#7B4DFF',
  dark: '#5A4A42',
  steel: '#AFAFC4',
  fairy: '#F5A3B7',
};

export const statColors: Record<string, string> = {
  hp: '#FF6B6B',
  attack: '#FFB26B',
  defense: '#FFE27A',
  'special-attack': '#7FB3FF',
  'special-defense': '#9FE08F',
  speed: '#FF8FB1',
};

import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define all screen names and the parameters each screen expects
export type RootStackParamList = {
  Home: undefined;
  PokemonList: undefined;
  PokemonDetails: { pokemon: any }; //TODO: Fix letter
};

// Navigation props for navigating between screens
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export type PokemonListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PokemonList'
>;

export type PokemonDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PokemonDetails'
>;

// Route props for receiving parameters passed TO a screen
export type PokemonDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetails'>;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../../app/screens/Home';
import PokemonDetailScreen from '../../app/screens/PokemonDetail';
import PokemonListScreen from '../../app/screens/PokemonList';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Stack Navigator for the Home tab
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetailScreen}
        options={{ title: 'Pokémon Details' }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator for the List/Pokedex tab
const ListStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{ title: 'Pokédex' }}
      />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetailScreen}
        options={{ title: 'Pokémon Details' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#34d399',
        tabBarInactiveTintColor: '#a1a1aa',
        tabBarStyle: {
          backgroundColor: '#27272a',
          borderTopColor: '#3f3f46',
          paddingBottom: 5,
          paddingTop: 5,
          height: 80,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Pokedex') {
            iconName = focused ? 'list' : 'list-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Explore" component={HomeStackNavigator} />
      <Tab.Screen name="Pokedex" component={ListStackNavigator} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

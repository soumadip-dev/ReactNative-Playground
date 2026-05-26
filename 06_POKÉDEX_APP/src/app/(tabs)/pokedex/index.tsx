import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Pokedex() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Text>pokedex</Text>

      <Link
        href={{
          pathname: '/(tabs)/pokedex/[id]',
          params: { id: '1' },
        }}
      >
        Go to Pokémon Details
      </Link>
    </View>
  );
}

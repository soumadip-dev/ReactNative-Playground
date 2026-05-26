import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function pokemonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pokemon ID: #{id}</Text>
    </View>
  );
}

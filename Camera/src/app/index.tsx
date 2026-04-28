import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home Screen</Text>
      <Link href="/camera" asChild>
        <Pressable style={style.floattingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const style = StyleSheet.create({
  floattingButton: {
    backgroundColor: 'royalblue',
    padding: 20,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

import { Link, useLocalSearchParams, Stack, router } from 'expo-router';
import { Image, Text, View, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';

export default function ImageScreen() {
  const { imgName: name } = useLocalSearchParams<{ imgName: string }>();
  const fullUri = (FileSystem.documentDirectory || '') + (name || '');

  const onDelete = async () => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await FileSystem.deleteAsync(fullUri);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Media',
          headerRight: () => (
            <View style={styles.headerActions}>
              <MaterialIcons onPress={onDelete} name="delete" size={26} color="#DC2626" />
              <MaterialIcons onPress={() => {}} name="save" size={26} color="#6B7280" />
            </View>
          ),
        }}
      />
      <Image source={{ uri: fullUri }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  headerActions: {
    gap: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

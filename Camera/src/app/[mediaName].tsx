import { Link, useLocalSearchParams, Stack, router } from 'expo-router';
import { Image, Text, View, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { determineMediaCategory } from '../utils/media';
import { VideoView } from 'expo-video';
import { useCustomVideoPlayer } from '../hooks/useCustomVideoPlayer';
import * as MediaLibrary from 'expo-media-library';

export default function MediaScreen() {
  const { mediaName: imageName } = useLocalSearchParams<{ mediaName: string }>();
  const mediaUri = (FileSystem.documentDirectory || '') + (imageName || '');
  const type = determineMediaCategory(mediaUri);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const { player } = useCustomVideoPlayer({
    sourceUri: type === 'video' ? mediaUri : '',
    autoPlay: true,
    loop: true,
  });

  const handleDeleteMedia = async () => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await FileSystem.deleteAsync(mediaUri);
            router.back();
          },
        },
      ]
    );
  };

  const handleSaveMedia = async () => {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission();
    }
    const albumAssets = await MediaLibrary.createAssetAsync(mediaUri);
    Alert.alert('Success', 'Saved successfully!');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Media',
          headerRight: () => (
            <View style={styles.headerActions}>
              <MaterialIcons onPress={handleDeleteMedia} name="delete" size={26} color="#DC2626" />
              <MaterialIcons onPress={handleSaveMedia} name="save" size={26} color="#6B7280" />
            </View>
          ),
        }}
      />
      {type === 'image' && <Image source={{ uri: mediaUri }} style={styles.media} />}
      {type === 'video' && (
        <VideoView
          player={player}
          style={styles.media}
          contentFit="cover"
          nativeControls={true}
          allowsPictureInPicture={false}
        />
      )}
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
  media: {
    width: '100%',
    height: '100%',
  },
});

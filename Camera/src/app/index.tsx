import { View, Text, Pressable, StyleSheet, FlatList, Image } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { determineMediaCategory, MediaCategory } from '../utils/media';
import { ResizeMode, Video } from 'expo-av';

type MediaFile = { fileName: string; fileUri: string; type: MediaCategory };

export default function HomeScreen() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchMediaFiles();
    }, [])
  );

  const fetchMediaFiles = async () => {
    if (!FileSystem.documentDirectory) return;

    const directoryFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);

    const filtered = directoryFiles
      .map(fileName => {
        const type = determineMediaCategory(fileName);

        return {
          fileName,
          fileUri: FileSystem.documentDirectory + fileName,
          type,
        };
      })
      .filter(file => file.type === 'image' || file.type === 'video');

    setMediaFiles(filtered);
  };

  return (
    <View style={styles.container}>
      {mediaFiles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrap}>
            <MaterialIcons name="photo-library" size={64} color="#ccc" />
          </View>
          <Text style={styles.emptyText}>No media found</Text>
          <Text style={styles.emptySubText}>Tap the camera button to capture your first photo</Text>
        </View>
      ) : (
        <FlatList
          data={mediaFiles}
          numColumns={3}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => (
            <Link href={`/${item.fileName}`} asChild>
              <Pressable style={styles.gridItem}>
                {item.type === 'image' && (
                  <Image source={{ uri: item.fileUri }} style={styles.gridImage} />
                )}
                {item.type === 'video' && (
                  <>
                    <Video
                      source={{ uri: item.fileUri }}
                      style={styles.gridImage}
                      resizeMode={ResizeMode.COVER}
                      positionMillis={100}
                    />
                    <MaterialIcons
                      name="play-circle-outline"
                      size={30}
                      color="white"
                      style={{ position: 'absolute' }}
                    />
                  </>
                )}
              </Pressable>
            </Link>
          )}
        />
      )}

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    gap: 1,
    paddingBottom: 100,
  },
  gridRow: {
    gap: 1,
  },
  gridItem: {
    flex: 1,
    maxWidth: '33.33%',
    backgroundColor: 'black',
  },
  gridImage: {
    aspectRatio: 3 / 4,
    borderRadius: 5,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 32,
  },
  emptyIconWrap: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#EDEEF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    letterSpacing: 0.3,
    marginTop: 6,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0.1,
  },

  floatingButton: {
    backgroundColor: '#2563EB',
    padding: 18,
    borderRadius: 56,
    position: 'absolute',
    bottom: 28,
    right: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
});

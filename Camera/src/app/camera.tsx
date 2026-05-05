import { router } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
  CameraMode,
  useMicrophonePermissions,
} from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import path from 'path';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';

export default function CameraScreen() {
  const [cameraPermissionStatus, requestCameraPermission] = useCameraPermissions();
  const [microphonePermissionStatus, requestMicrophonePermission] = useMicrophonePermissions();

  const [cameraFacing, setCameraFacing] = useState<CameraType>('back');
  const [capturedPhoto, setCapturedPhoto] = useState<CameraCapturedPicture>();
  const [captureMode, setCaptureMode] = useState<CameraMode>('picture');

  const cameraRef = useRef<CameraView>(null);
  const toggleAnimation = useRef(new Animated.Value(0)).current;

  const [recordingActive, setRecordingActive] = useState(false);
  const [recordedVideoUri, setRecordedVideoUri] = useState<string>();

  useEffect(() => {
    if (
      cameraPermissionStatus &&
      !cameraPermissionStatus.granted &&
      cameraPermissionStatus.canAskAgain
    ) {
      requestCameraPermission();
    }
  }, [cameraPermissionStatus]);

  useEffect(() => {
    if (
      microphonePermissionStatus &&
      !microphonePermissionStatus.granted &&
      microphonePermissionStatus.canAskAgain
    ) {
      requestMicrophonePermission();
    }
  }, [microphonePermissionStatus]);

  const handleTakePhoto = async () => {
    const photoResult = await cameraRef.current?.takePictureAsync();
    if (photoResult) setCapturedPhoto(photoResult);
  };

  const handleVideoRecording = async () => {
    if (recordingActive) {
      setRecordingActive(false);
      cameraRef.current?.stopRecording();
      return;
    }

    setRecordingActive(true);
    const videoResult = await cameraRef.current?.recordAsync({ maxDuration: 10 });

    console.log(videoResult);
    if (videoResult) setRecordedVideoUri(videoResult.uri);

    setRecordingActive(false);
  };

  const handleToggleMode = (mode: CameraMode) => {
    setCaptureMode(mode);

    Animated.spring(toggleAnimation, {
      toValue: mode === 'picture' ? 0 : 1,
      useNativeDriver: false,
      tension: 80,
      friction: 10,
    }).start();
  };

  const handleToggleCameraFacing = () => {
    setCameraFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const handleSaveMedia = async (fileUri: string) => {
    const parsedFileName = path.parse(fileUri).base;

    await FileSystem.copyAsync({
      from: fileUri,
      to: FileSystem.documentDirectory + parsedFileName,
    });

    setCapturedPhoto(undefined);
    router.back();
  };

  if (!cameraPermissionStatus?.granted || !microphonePermissionStatus?.granted) {
    return <ActivityIndicator />;
  }

  const renderMediaPreview = (mediaUri: string, mediaType: 'picture' | 'video') => {
    return (
      <View style={styles.pictureContainer}>
        {mediaType === 'video' ? (
          <Video
            source={{ uri: mediaUri }}
            style={{ width: '100%', flex: 1 }}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            shouldPlay
            isLooping
          />
        ) : (
          <Image source={{ uri: mediaUri }} style={styles.pictureImage} resizeMode="cover" />
        )}

        <View style={styles.pictureOverlay} />

        <Pressable
          onPress={() =>
            mediaType === 'video' ? setRecordedVideoUri(undefined) : setCapturedPhoto(undefined)
          }
          style={styles.pictureCloseButton}
          accessibilityRole="button"
          accessibilityLabel={`Discard ${mediaType}`}
        >
          <MaterialIcons name="close" size={22} color="white" />
        </Pressable>

        <View style={styles.pictureBadge}>
          <MaterialIcons
            name={mediaType === 'video' ? 'videocam' : 'photo-camera'}
            size={11}
            color="white"
          />
          <Text style={styles.pictureBadgeText}>
            {mediaType === 'video' ? 'VIDEO' : 'PHOTO'} PREVIEW
          </Text>
        </View>

        <SafeAreaView edges={['bottom']} style={styles.pictureActionArea}>
          <Pressable
            style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
            onPress={() => handleSaveMedia(mediaUri)}
            accessibilityRole="button"
            accessibilityLabel={`Save ${mediaType}`}
          >
            <MaterialIcons name="save-alt" size={20} color="#0a0a0a" />
            <Text style={styles.saveButtonText}>
              {mediaType === 'video' ? 'Save Video' : 'Save Photo'}
            </Text>
          </Pressable>
        </SafeAreaView>
      </View>
    );
  };

  const togglePillPosition = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['2%', '50%'],
  });

  const renderCameraView = () => {
    return (
      <>
        <CameraView style={styles.camera} facing={cameraFacing} ref={cameraRef} mode={captureMode}>
          <View style={styles.modeBadge}>
            <Text style={styles.modeBadgeText}>
              {captureMode === 'picture' ? '📷 PHOTO' : '🎬 VIDEO'}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.modeToggleWrapper}>
              <Animated.View style={[styles.togglePill, { left: togglePillPosition }]} />

              <Pressable
                style={styles.toggleOption}
                onPress={() => handleToggleMode('picture')}
                accessibilityRole="button"
                accessibilityLabel="Photo mode"
              >
                <MaterialIcons
                  name="photo-camera"
                  size={15}
                  color={captureMode === 'picture' ? '#0a0a0a' : 'rgba(255,255,255,0.6)'}
                />
                <Text
                  style={[
                    styles.toggleLabel,
                    captureMode === 'picture' && styles.toggleLabelActive,
                  ]}
                >
                  Photo
                </Text>
              </Pressable>

              <Pressable
                style={styles.toggleOption}
                onPress={() => handleToggleMode('video')}
                accessibilityRole="button"
                accessibilityLabel="Video mode"
              >
                <MaterialIcons
                  name="videocam"
                  size={15}
                  color={captureMode === 'video' ? '#0a0a0a' : 'rgba(255,255,255,0.6)'}
                />
                <Text
                  style={[styles.toggleLabel, captureMode === 'video' && styles.toggleLabelActive]}
                >
                  Video
                </Text>
              </Pressable>
            </View>

            <View style={styles.actionRow}>
              <View style={styles.sideSlot} />

              <Pressable
                style={({ pressed }) => [
                  styles.captureButton,
                  captureMode === 'video' && styles.captureButtonVideo,
                  recordingActive && styles.captureButtonRecording,
                  pressed && styles.captureButtonPressed,
                ]}
                onPress={captureMode === 'video' ? handleVideoRecording : handleTakePhoto}
                accessibilityRole="button"
                accessibilityLabel={
                  captureMode === 'picture'
                    ? 'Take photo'
                    : recordingActive
                      ? 'Stop recording'
                      : 'Start recording'
                }
              >
                {recordingActive ? (
                  <View style={styles.stopIcon} />
                ) : (
                  <View
                    style={[
                      styles.captureInner,
                      captureMode === 'video' && styles.captureInnerVideo,
                    ]}
                  />
                )}
              </Pressable>

              <View style={styles.sideSlot}>
                <Pressable
                  style={styles.flipButton}
                  onPress={handleToggleCameraFacing}
                  accessibilityRole="button"
                  accessibilityLabel="Flip camera"
                >
                  <MaterialIcons name="flip-camera-ios" size={26} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </CameraView>

        <Pressable
          style={styles.closeButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Close camera"
        >
          <MaterialIcons name="close" color="white" size={28} />
        </Pressable>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {capturedPhoto
        ? renderMediaPreview(capturedPhoto.uri, 'picture')
        : recordedVideoUri
          ? renderMediaPreview(recordedVideoUri, 'video')
          : renderCameraView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  camera: {
    width: '100%',
    height: '100%',
  },
  modeBadge: {
    position: 'absolute',
    top: 58,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  modeBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 24,
    gap: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modeToggleWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 30,
    padding: 2,
    width: 210,
    height: 40,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  togglePill: {
    position: 'absolute',
    top: 2,
    width: '48%',
    height: 34,
    borderRadius: 28,
    backgroundColor: 'white',
  },
  toggleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    zIndex: 1,
  },
  toggleLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  toggleLabelActive: {
    color: '#0a0a0a',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideSlot: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonVideo: {
    borderColor: '#FF3B30',
  },
  captureButtonRecording: {
    borderColor: '#FF3B30',
    backgroundColor: 'rgba(255,59,48,0.2)',
  },
  captureButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.94 }],
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'white',
  },
  captureInnerVideo: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  stopIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FF3B30',
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 54,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pictureContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  pictureImage: {
    flex: 1,
    width: '100%',
  },
  pictureOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  pictureCloseButton: {
    position: 'absolute',
    top: 54,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  pictureBadge: {
    position: 'absolute',
    top: 58,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  pictureBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  pictureActionArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  saveButtonText: {
    color: '#0a0a0a',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

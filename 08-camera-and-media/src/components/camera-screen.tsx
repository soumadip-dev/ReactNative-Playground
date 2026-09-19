import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<FlashMode>('auto');
  const [zoom, setZoom] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.messageText}>Checking Permissions....</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <TouchableOpacity onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlash() {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      if (photo) {
        setPhotoUrl(photo.uri);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        flash={flashMode}
        zoom={zoom}
      />
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
          <Text style={styles.controlButtonText}>{flashMode === 'off' ? '⚡️ Off' : '⚡️ On'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
          <Text style={styles.controlButtonText}>🔄 Flip</Text>
        </TouchableOpacity>
      </View>
      {!photoUrl && (
        <View style={styles.bottomControls}>
          <Text style={styles.zoomText}>Zoom: {Math.round(zoom * 100)}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={zoom}
            onValueChange={setZoom}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#666666"
            thumbTintColor="#FFFFFF"
          />
        </View>
      )}
      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <View style={styles.captureButtonInner} />
      </TouchableOpacity>

      {photoUrl && (
        <View style={[StyleSheet.absoluteFill, styles.previewContainer]}>
          <Image source={{ uri: photoUrl }} style={styles.previewImage} />
          <View style={styles.previewButtons}>
            <TouchableOpacity
              style={[styles.previewButton, styles.retakeButton]}
              onPress={() => setPhotoUrl(null)}
            >
              <Text style={styles.previewButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.previewButton, styles.saveButton]}
              onPress={() => {
                // Handle save logic here
                alert('Photo saved!');
                setPhotoUrl(null);
              }}
            >
              <Text style={styles.previewButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  // Permission screen
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#111',
  },

  messageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  message: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },

  permissionButtonText: {
    color: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '700',
    overflow: 'hidden',
  },

  // Camera controls
  topControls: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  controlButton: {
    minWidth: 52,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },

  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Bottom controls
  bottomControls: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 105,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  zoomText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },

  slider: {
    width: '100%',
    height: 35,
  },

  // Capture button
  captureButton: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 3,
    borderColor: '#fff',
  },

  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },

  // Photo preview
  previewContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  previewImage: {
    width: '100%',
    height: '75%',
    resizeMode: 'contain',
    borderRadius: 18,
  },

  previewButtons: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 24,
  },

  previewButton: {
    minWidth: 120,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  retakeButton: {
    backgroundColor: '#292929',
    borderWidth: 1,
    borderColor: '#555',
  },

  saveButton: {
    backgroundColor: '#fff',
  },

  previewButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },
});

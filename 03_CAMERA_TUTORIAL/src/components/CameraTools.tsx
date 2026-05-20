import { Pressable, StyleSheet, View } from 'react-native';
import { FlashMode } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<'front' | 'back'>>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
  cameraFacing: 'front' | 'back';
}

export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
  cameraFacing,
}: CameraToolsProps) {
  const cycleFlashMode = () => {
    const modes: FlashMode[] = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(cameraFlash);
    const nextIndex = (currentIndex + 1) % modes.length;
    setCameraFlash(modes[nextIndex]);
  };

  return (
    <View style={styles.container}>
      {cameraFacing === 'back' && (
        <Pressable onPress={() => setCameraTorch(prev => !prev)} style={styles.toolButton}>
          <MaterialIcons
            name={cameraTorch ? 'flashlight-off' : 'flashlight-on'}
            size={24}
            color="white"
          />
        </Pressable>
      )}

      <Pressable onPress={cycleFlashMode} style={styles.toolButton}>
        <MaterialIcons
          name={
            cameraFlash === 'on' ? 'flash-on' : cameraFlash === 'auto' ? 'flash-auto' : 'flash-off'
          }
          size={24}
          color="white"
        />
      </Pressable>

      <Pressable
        onPress={() => setCameraFacing(prev => (prev === 'back' ? 'front' : 'back'))}
        style={styles.toolButton}
      >
        <MaterialIcons name="flip-camera-android" size={24} color="white" />
      </Pressable>

      <Pressable
        onPress={() => {
          if (cameraZoom < 1) {
            setCameraZoom(prev => Math.min(prev + 0.05, 1));
          }
        }}
        style={styles.toolButton}
      >
        <MaterialIcons name="zoom-in" size={24} color="white" />
      </Pressable>

      <Pressable
        onPress={() => {
          if (cameraZoom > 0) {
            setCameraZoom(prev => Math.max(prev - 0.05, 0));
          }
        }}
        style={styles.toolButton}
      >
        <MaterialIcons name="zoom-out" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -110,
    gap: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 32,
    zIndex: 1,
  },
  toolButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

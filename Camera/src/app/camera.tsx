import { router } from 'expo-router';
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';
import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const camera = useRef<CameraView>(null);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const toggleCameraFacing = () => {
    setFacing(current => {
      return current === 'back' ? 'front' : 'back';
    });
  };

  const takePicture = async () => {
    const res = await camera.current?.takePictureAsync();

    if (res) {
      setPicture(res);
    }
  };

  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  if (picture) {
    return (
      <View>
        <Image source={{ uri: picture.uri }} style={{ width: '100%', height: '100%' }} />
        <MaterialIcons
          onPress={() => {
            setPicture(undefined);
          }}
          name="close"
          size={35}
          color="white"
          style={{ position: 'absolute', top: 50, left: 20 }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.footer}>
          <View></View>
          <Pressable style={styles.recordButton} onPress={takePicture} />
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>
      <MaterialIcons
        name="close"
        color={'white'}
        style={styles.close}
        size={30}
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    paddingBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  recordButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});

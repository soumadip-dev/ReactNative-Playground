import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const processImage = async (uri: string) => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [
          {
            resize: {
              width: 400,
              height: 400,
            },
          },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setProfileImage(result.uri);
    } catch (error) {
      console.error('Image processing error:', error);

      Alert.alert('Error', 'Something went wrong while processing the image.');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Camera Permission Required', 'Please allow camera access to take a photo.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);

      Alert.alert('Error', 'Unable to take a photo. Please try again.');
    }
  };

  const choosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Photo Library Permission Required',
        'Please allow photo library access to choose an image.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);

      Alert.alert('Error', 'Unable to select the image. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Photo</Text>

      <Text style={styles.subtitle}>Choose or capture a profile picture</Text>

      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>👤</Text>
            <Text style={styles.placeholderText}>No Photo</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={takePhoto}
        >
          <Text style={styles.buttonIcon}>📷</Text>
          <Text style={styles.primaryButtonText}>Take Photo</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={choosePhoto}
        >
          <Text style={styles.buttonIcon}>🖼️</Text>
          <Text style={styles.secondaryButtonText}>Choose Photo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    color: '#0F172A',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 8,
  },

  subtitle: {
    color: '#64748B',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 36,
  },

  profileContainer: {
    marginBottom: 40,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#E2E8F0',
  },

  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E2E8F0',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },

  placeholderText: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
  },

  buttonContainer: {
    width: '100%',
    gap: 14,
  },

  button: {
    width: '100%',
    minHeight: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  buttonIcon: {
    fontSize: 19,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '700',
  },
});

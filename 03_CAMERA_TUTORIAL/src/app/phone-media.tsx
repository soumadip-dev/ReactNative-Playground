import { View, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';

export default function PhoneMedia() {
  const [image, setImage] = useState<string | null>(null);

  const requestPermissionAndLoadMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    requestPermissionAndLoadMedia();
  }, []);

  useFocusEffect(
    useCallback(() => {
      requestPermissionAndLoadMedia();
    }, [])
  );
  return (
    <View>
      <Text>phone-media</Text>
    </View>
  );
}

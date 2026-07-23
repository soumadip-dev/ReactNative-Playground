import ProfileGallery from '@/components/profileGallery';
import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 

export default function Index() {
  return (
    <View style={styles.container}>
      <ProfileGallery />
      <StatusBar style="auto" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

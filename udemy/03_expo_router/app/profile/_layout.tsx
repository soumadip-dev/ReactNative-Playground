import { Slot } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Profile Header</Text>
      <Slot />
      <Text style={styles.footer}>Profile Footer</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    padding: 12,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#242222',
  },
  footer: {
    fontSize: 24,
    padding: 12,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#242222',
  },
});

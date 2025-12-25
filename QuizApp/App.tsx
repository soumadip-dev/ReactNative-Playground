import { StatusBar } from 'expo-status-bar';
import QuizScreen from './src/app/QuizScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.page}>
        <QuizScreen />
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FDFEF4',
    flex: 1,
  },
});

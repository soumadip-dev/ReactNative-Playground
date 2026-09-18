import { TiltCounter } from '@/components/TiltCounter';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <TiltCounter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

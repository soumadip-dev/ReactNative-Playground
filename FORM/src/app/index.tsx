import { Link, Stack } from 'expo-router';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomeButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome</Text>

        <Text style={styles.subHeading}>Continue to checkout to complete your order</Text>

        <Link href="/checkout" asChild>
          <CustomButton title="Checkout" style={styles.button} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  content: {
    alignItems: 'center',
  },

  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 10,
  },

  button: {
    width: '100%',
  },
});

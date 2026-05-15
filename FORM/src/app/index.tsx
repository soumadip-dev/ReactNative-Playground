import { Link, Stack } from 'expo-router';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomeButton';

export default function App() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome</Text>
        <View style={styles.divider} />
        <Text style={styles.subHeading}>Continue to checkout to complete your order</Text>
        <View style={styles.buttonGroup}>
          <Link href="/checkout" asChild>
            <CustomButton title="Checkout" style={styles.button} />
          </Link>
          <Link href="/signUp" asChild>
            <CustomButton title="Sign Up" style={styles.buttonOutline} />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 28,
    alignItems: 'center',
    elevation: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  heading: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -1,
    textAlign: 'center',
    marginBottom: 14,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#111',
    borderRadius: 2,
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    paddingHorizontal: 8,
    letterSpacing: 0.2,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
  buttonOutline: {
    width: '100%',
  },
});

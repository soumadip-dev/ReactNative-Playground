import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function PaymentDetailsForm() {
  function handleNext() {
    // Validate the form
    // If valid, navigate to the next screen
    router.push('/checkout/confirm');
  }
  return (
    <View style={styles.container}>
      <Text>Payment Screen.</Text>
      <CustomButton title="Next" style={styles.button} onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 25,
  },
});

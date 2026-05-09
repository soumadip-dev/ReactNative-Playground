import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';

export default function PaymentDetailsForm() {
  function handleNextStep() {
    // Validate the form
    // If valid, navigate to the next screen
    router.push('/checkout/confirm');
  }

  return (
    <KeyboardAwareScrollView>
      <Text>Payment Screen.</Text>

      <CustomButton title="Next" style={styles.nextButton} onPress={handleNextStep} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    marginTop: 'auto',
    marginBottom: 25,
  },
});

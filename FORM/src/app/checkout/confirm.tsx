import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';

export default function ConfirmForm() {
  function handleFormSubmit() {
    // Validate the form
    // If valid, navigate to the next screen
    // router.push('/');

    router.dismissAll(); // Returns to the first screen in the closest stack
    router.back();
  }

  return (
    <KeyboardAwareScrollView>
      <Text>Confirm Screen.</Text>

      <CustomButton title="Submit" style={styles.submitButton} onPress={handleFormSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 'auto',
    marginBottom: 25,
  },
});

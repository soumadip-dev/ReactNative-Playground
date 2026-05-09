import CustomButton from '@/src/components/CustomeButton';
import CustomTextInput from '@/src/components/CustomeTextInput';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';

export default function PersonalDetailsForm() {
  const [fullName, setFullName] = useState('');

  function handleNextStep() {
    // Validate the form
    // If valid, navigate to the next screen

    console.log('Submit: ', fullName);

    router.push('/checkout/payment');
  }

  return (
    <KeyboardAwareScrollView>
      <CustomTextInput placeholder="John Doe" labelText="Full name" />

      <CustomTextInput placeholder="123 Main Street" labelText="Address" />

      <View style={styles.locationRow}>
        <CustomTextInput placeholder="New York" labelText="City" wrapperStyle={styles.flexInput} />

        <CustomTextInput
          placeholder="12345"
          labelText="Post code"
          wrapperStyle={styles.flexInput}
        />
      </View>

      <CustomTextInput placeholder="123456789" labelText="Phone number" inputMode="tel" />

      <CustomButton title="Next" style={styles.nextButton} onPress={handleNextStep} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  locationRow: {
    flexDirection: 'row',
    gap: 5,
  },

  flexInput: {
    flex: 1,
  },

  nextButton: {
    marginTop: 'auto',
  },
});

import CustomButton from '@/src/components/CustomeButton';
import CustomTextInput from '@/src/components/CustomeTextInput';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function PersonalDetailsForm() {
  const [fullname, setFullname] = useState('');
  function handleNext() {
    // Validate the form
    // If valid, navigate to the next screen

    console.log('Submit: ', fullname);

    router.push('/checkout/payment');
  }
  return (
    <View style={styles.container}>
      <CustomTextInput placeholder="John Doe" labelText="Full name" />
      <CustomTextInput placeholder="123 Main Street" labelText="Address" />
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <CustomTextInput placeholder="New York" labelText="City" wrapperStyle={{ flex: 1 }} />
        <CustomTextInput placeholder="12345" labelText="Post code" wrapperStyle={{ flex: 1 }} />
      </View>
      <CustomTextInput placeholder="123456789" labelText="Phone number" inputMode="tel" />
      <CustomButton title="Next" style={styles.button} onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    gap: 5,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 25,
  },
});

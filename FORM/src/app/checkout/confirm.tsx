import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ConfirmForm() {
  function handleSubmit() {
    // Validate the form
    // If valid, navigate to the next screen
    // router.push('/');
    router.dismissAll(); // Returns to the first screen in the closest stack
    router.back();
  }
  return (
    <View style={styles.container}>
      <Text>Confirm Screen.</Text>
      <CustomButton title="Submit" style={styles.button} onPress={handleSubmit} />
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

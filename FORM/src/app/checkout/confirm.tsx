import CustomButton from '@/src/components/CustomeButton';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';

const personalInfo = {
  fullName: 'Vadim Savin',
  address: 'Poblenou',
  city: 'Barcelona',
  postcode: '1234',
  phone: '60123123123',
  country: 'ES',
};

const paymentInfo = {
  cardNumber: '1234123412341234',
  expires: '01/30',
  cvv: '123',
};

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
      <View style={{ gap: 10, flex: 1 }}>
        {personalInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Personal</Text>
              <Link href={'/checkout'} style={{ color: '#005055', fontWeight: '600' }}>
                Edit
              </Link>
            </View>
            {Object.entries(personalInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}
        {paymentInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Payment</Text>
              <Link href={'/checkout/payment'} style={{ color: '#005055', fontWeight: '600' }}>
                Edit
              </Link>
            </View>
            {Object.entries(paymentInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}
      </View>
      <CustomButton title="Submit" style={styles.submitButton} onPress={handleFormSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 25,
    gap: 15,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    borderRadius: 10,
    gap: 3,
  },
  dataContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 'auto',
    marginBottom: 25,
  },
});

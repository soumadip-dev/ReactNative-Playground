import CustomButton from '@/src/components/CustomeButton';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';
import { useCheckoutForm } from '@/src/contexts/CheckoutFormProvider';

export default function ConfirmForm() {
  const { personalInfo, paymentInfo, onSubmit: handleFormSubmit } = useCheckoutForm();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Confirm Details</Text>

          <Text style={styles.subHeading}>Review your personal and payment information</Text>
        </View>

        {personalInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Personal</Text>

              <Link href="/checkout" style={styles.editLink}>
                Edit
              </Link>
            </View>

            {Object.entries(personalInfo).map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{key}</Text>

                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        )}

        {paymentInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Payment</Text>

              <Link href="/checkout/payment" style={styles.editLink}>
                Edit
              </Link>
            </View>

            {Object.entries(paymentInfo).map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{key}</Text>

                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        )}

        <CustomButton title="Submit" style={styles.submitButton} onPress={handleFormSubmit} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    gap: 18,
    backgroundColor: '#fff',
  },

  headerContainer: {
    marginBottom: 4,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },

  subHeading: {
    fontSize: 14,
    color: '#666',
  },

  dataContainer: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderRadius: 16,
    gap: 10,
  },

  dataContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  editLink: {
    color: '#005055',
    fontWeight: '600',
    fontSize: 14,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ECECEC',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    textTransform: 'capitalize',
  },

  value: {
    fontSize: 14,
    color: '#222',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 12,
  },

  submitButton: {
    marginTop: 'auto',
  },
});

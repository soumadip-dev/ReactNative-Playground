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
        {personalInfo ? (
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
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyCardLeft}>
              <Text style={styles.emptyCardTitle}>Personal info</Text>
              <Text style={styles.emptyCardSubtitle}>No details filled in yet</Text>
            </View>
            <Link href="/checkout" style={styles.fillLink}>
              Fill in
            </Link>
          </View>
        )}

        {paymentInfo ? (
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
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyCardLeft}>
              <Text style={styles.emptyCardTitle}>Payment info</Text>
              <Text style={styles.emptyCardSubtitle}>No details filled in yet</Text>
            </View>
            <Link href="/checkout/payment" style={styles.fillLink}>
              Fill in
            </Link>
          </View>
        )}

        {personalInfo && paymentInfo && (
          <CustomButton title="Submit" style={styles.submitButton} onPress={handleFormSubmit} />
        )}
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
  lastRow: {
    borderBottomWidth: 0,
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

  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'dashed',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
  },
  emptyCardLeft: {
    gap: 3,
  },
  emptyCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  emptyCardSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  fillLink: {
    color: '#005055',
    fontWeight: '600',
    fontSize: 14,
  },
});

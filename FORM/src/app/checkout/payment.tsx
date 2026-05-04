import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ReactHookFormTextInput from '@/src/components/ReactHookFormTextInput';
import { PaymentInfo, PaymentDetailsSchema } from '@/src/schemas/payment.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function PaymentDetailsForm() {
  const form = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentDetailsSchema),
  });

  const { handleSubmit } = form;

  const handleNextStep: SubmitHandler<PaymentInfo> = data => {
    console.log('DATA FROM THE FORM:', data);
    router.push('/checkout/confirm');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <ReactHookFormTextInput
          placeholder="1234 1234 1234 1234"
          labelText="Card Number"
          name="cardNumber"
          inputMode="numeric"
        />
        <View style={styles.cardDetailsRow}>
          <ReactHookFormTextInput
            placeholder="MM/YY"
            labelText="Expiry Date"
            name="expiryDate"
            wrapperStyle={styles.flexInput}
          />
          <ReactHookFormTextInput
            placeholder="CVV"
            labelText="CVV"
            name="cvv"
            inputMode="numeric"
            wrapperStyle={styles.flexInput}
          />
        </View>
        {/* checkbox - Save your card information */}
        <View style={styles.saveCardContainer}>
          <View style={styles.checkboxPlaceholder} />
          <Text style={styles.saveCardText}>Save card information</Text>
        </View>
        <CustomButton
          title="Next"
          style={styles.nextButton}
          onPress={handleSubmit(handleNextStep)}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    marginTop: 'auto',
  },
  cardDetailsRow: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 15,
  },
  flexInput: {
    flex: 1,
  },
  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  checkboxPlaceholder: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 10,
  },

  saveCardText: {
    fontSize: 14,
  },
});

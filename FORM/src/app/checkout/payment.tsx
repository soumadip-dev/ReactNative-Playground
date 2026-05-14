import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ReactHookFormTextInput from '@/src/components/ReactHookFormTextInput';
import { PaymentInfo, PaymentDetailsSchema } from '@/src/schemas/payment.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCheckoutForm } from '@/src/contexts/CheckoutFormProvider';
import CustomCheckbox from '@/src/components/CustomCheckbox';

export default function PaymentDetailsForm() {
  const { setPaymentInfo, paymentInfo } = useCheckoutForm();

  const form = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentDetailsSchema),
    defaultValues: paymentInfo,
  });

  const { handleSubmit } = form;

  const handleNextStep: SubmitHandler<PaymentInfo> = data => {
    setPaymentInfo(data);
    router.push('/checkout/confirm');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <View style={styles.container}>
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

          <CustomCheckbox name="saveCard" label="Save card information" />

          <CustomButton
            title="Next"
            style={styles.nextButton}
            onPress={handleSubmit(handleNextStep)}
          />
        </View>
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    gap: 12,
  },

  nextButton: {
    marginTop: 'auto',
  },

  cardDetailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  flexInput: {
    flex: 1,
  },

  saveCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    gap: 10,
    paddingHorizontal: 4,
  },

  saveCardText: {
    fontSize: 14,
    color: '#444',
  },
});

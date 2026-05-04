import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import ReactHookFormTextInput from '@/src/components/ReactHookFormTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoSchema, PersonalInfo } from '@/src/schemas/personal-info.schema';
import { useCheckoutForm } from '@/src/contexts/CheckoutFormProvider';

export default function PersonalDetailsForm() {
  const { setPersonalInfo, personalInfo } = useCheckoutForm();

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: personalInfo,
  });

  const { handleSubmit } = form;

  const handleNextStep: SubmitHandler<PersonalInfo> = data => {
    setPersonalInfo(data);
    router.push('/checkout/payment');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <View style={styles.container}>
          <Text style={styles.heading}>Personal Details</Text>

          <Text style={styles.subHeading}>Fill in your delivery and contact information</Text>

          <ReactHookFormTextInput placeholder="John Doe" labelText="Full name" name="fullName" />

          <ReactHookFormTextInput
            placeholder="123 Main Street"
            labelText="Address"
            name="address"
          />

          <View style={styles.locationRow}>
            <ReactHookFormTextInput
              placeholder="New York"
              labelText="City"
              wrapperStyle={styles.flexInput}
              name="city"
            />

            <ReactHookFormTextInput
              placeholder="12345"
              labelText="Post code"
              wrapperStyle={styles.flexInput}
              name="postcode"
              inputMode="numeric"
            />
          </View>

          <ReactHookFormTextInput
            placeholder="123456789"
            labelText="Phone number"
            inputMode="tel"
            name="phone"
          />

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
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    color: '#111',
  },

  subHeading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },

  locationRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },

  flexInput: {
    flex: 1,
  },

  nextButton: {
    marginTop: 'auto',
  },
});

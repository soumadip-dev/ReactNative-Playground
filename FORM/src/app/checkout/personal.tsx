import CustomButton from '@/src/components/CustomeButton';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import ReactHookFormTextInput from '@/src/components/ReactHookFormTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoSchema, PersonalInfo } from '@/src/schemas/personal-info.schema';

export default function PersonalDetailsForm() {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
  });

  const { handleSubmit } = form;

  const handleNextStep: SubmitHandler<PersonalInfo> = data => {
    console.log('DATA FROM THE FORM:', data);
    router.push('/checkout/payment');
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <ReactHookFormTextInput placeholder="John Doe" labelText="Full name" name="fullName" />

        <ReactHookFormTextInput placeholder="123 Main Street" labelText="Address" name="address" />

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
      </FormProvider>
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

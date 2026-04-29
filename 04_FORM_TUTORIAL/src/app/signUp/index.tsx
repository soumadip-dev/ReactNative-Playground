import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/src/components/CustomeButton';
import KeyboardAwareScrollView from '@/src/components/KeyboardAwareScrollView';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpInfo, SignUpSchema } from '@/src/schemas/signup.schema';
import ReactHookFormTextInput from '@/src/components/ReactHookFormTextInput';
import CustomDateTimePicker from '@/src/components/CustomDateTimePicker';
import CustomCheckbox from '@/src/components/CustomCheckbox';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp: SubmitHandler<SignUpInfo> = data => {
    console.log(data);
  };

  const signUpForm = useForm<SignUpInfo>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {},
  });

  const { handleSubmit } = signUpForm;

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...signUpForm}>
        <View style={styles.container}>
          <Text style={styles.heading}>Sign Up</Text>
          <ReactHookFormTextInput placeholder="John Doe" labelText="Full name" name="fullName" />
          <ReactHookFormTextInput placeholder="john@gmail.com" labelText="Email" name="email" />
          <ReactHookFormTextInput
            placeholder="Password"
            labelText="Password"
            name="password"
            secureTextEntry={!showPassword}
            rightIcon={
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color="#6B7280"
                onPress={() => setShowPassword(prev => !prev)}
              />
            }
          />
          <ReactHookFormTextInput
            placeholder="Confirm Password"
            labelText="Confirm Password"
            name="confirmPassword"
            secureTextEntry={!showConfirmPassword}
            rightIcon={
              <MaterialIcons
                name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color="#6B7280"
                onPress={() => setShowConfirmPassword(prev => !prev)}
              />
            }
          />
          <CustomDateTimePicker name="dateOfBirth" labelText="Date of birth" />
          <CustomCheckbox
            name="acceptTerms"
            label="I accept the terms and privacy policy"
            color="#3D6CE2"
          />
        </View>
        <CustomButton
          title="Sign Up"
          style={styles.signUpButton}
          onPress={handleSubmit(handleSignUp)}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 28,
  },
  signUpButton: {
    backgroundColor: '#3D6CE2',
    marginTop: 'auto',
    borderRadius: 14,
  },
});

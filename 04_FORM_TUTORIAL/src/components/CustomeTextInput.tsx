//* Use it if not using react-hook-form

import { ComponentProps } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

type CustomTextInputProps = {
  labelText?: string;
  inputStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

export default function CustomTextInput({
  labelText,
  inputStyle,
  wrapperStyle,
  ...inputProps
}: CustomTextInputProps) {
  const validationError = undefined;

  return (
    <View style={wrapperStyle}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}

      <TextInput
        {...inputProps}
        style={[styles.input, inputStyle, validationError && styles.errorInput]}
        // onChangeText={() => {}} // simplification of this => onChangeText={text => setFullname(text)}
        // onBlur={() => console.log('Blur')}
        // onEndEditing={() => console.log('onendediting')}
      />

      <Text style={styles.errorMessage} numberOfLines={1}>
        {validationError?.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14,
  },

  button: {
    marginTop: 'auto',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'dimgray',
    marginBottom: 6,
    marginLeft: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 8,

    paddingHorizontal: 14,
    paddingVertical: 12,

    fontSize: 15,
    color: 'black',

    backgroundColor: 'white',
  },

  errorInput: {
    borderColor: 'crimson',
  },

  errorMessage: {
    color: 'crimson',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
    height: 17,
  },
});

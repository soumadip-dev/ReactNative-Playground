//* Use it if using react-hook-form

import { ComponentProps } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';
import { useController } from 'react-hook-form';

type ReactHookFormTextInputProps = {
  name: string;
  labelText?: string;
  inputStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

export default function ReactHookFormTextInput({
  name,
  labelText,
  inputStyle,
  wrapperStyle,
  ...inputProps
}: ReactHookFormTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error: validationError },
  } = useController({ name });

  return (
    <View style={wrapperStyle}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}

      <TextInput
        {...inputProps}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        style={[styles.input, inputStyle, validationError && styles.errorInput]}
      />

      {validationError && (
        <Text style={styles.errorMessage} numberOfLines={1}>
          {validationError?.message || 'Error'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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

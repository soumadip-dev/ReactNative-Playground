//* Use it if using react-hook-form
import { ComponentProps, ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useController } from 'react-hook-form';

type ReactHookFormTextInputProps = {
  name: string;
  labelText?: string;
  inputStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactNode;
} & ComponentProps<typeof TextInput>;

export default function ReactHookFormTextInput({
  name,
  labelText,
  inputStyle,
  wrapperStyle,
  rightIcon,
  ...inputProps
}: ReactHookFormTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error: validationError },
  } = useController({ name });

  return (
    <View style={wrapperStyle}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <View style={[styles.inputWrapper, validationError && styles.errorInput]}>
        <TextInput
          {...inputProps}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={[styles.input, inputStyle]}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.rightIcon} activeOpacity={0.6}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: 'black',
  },
  rightIcon: {
    paddingHorizontal: 12,
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

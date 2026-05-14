import { ComponentProps } from 'react';
import { useController } from 'react-hook-form';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type CustomPickerProps = Omit<ComponentProps<typeof RNPickerSelect>, 'onValueChange'> & {
  name: string;
  labelText?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
};

export default function CustomPicker({
  name,
  labelText,
  wrapperStyle,
  ...pickerSelectProps
}: CustomPickerProps) {
  const {
    field: { value: selectedValue, onChange: handleValueChange, onBlur: handleBlur },
    fieldState: { error: fieldError },
  } = useController({ name });

  return (
    <View style={wrapperStyle}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}

      <RNPickerSelect
        {...pickerSelectProps}
        value={selectedValue}
        onValueChange={handleValueChange}
        onClose={handleBlur}
        style={{
          viewContainer: {
            marginTop: 4,
            marginBottom: 2,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'gainsboro',
          },
          inputIOS: {
            borderColor: 'gainsboro',
            borderWidth: 1,
            width: '100%',
            padding: 10,
            borderRadius: 10,
          },
        }}
      />

      {fieldError && (
        <Text style={styles.errorMessage} numberOfLines={1}>
          {fieldError.message || 'Error'}
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

  errorMessage: {
    color: 'crimson',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
    height: 17,
  },
});

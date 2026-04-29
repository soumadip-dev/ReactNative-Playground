import { useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useController } from 'react-hook-form';

type CustomDateTimePickerProps = {
  name: string;
  labelText?: string;
  style?: StyleProp<ViewStyle>;
};

export default function CustomDateTimePicker({
  name,
  labelText,
  style,
}: CustomDateTimePickerProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error: validationError },
  } = useController({ name });

  const showDatePicker = () => setIsDatePickerVisible(true);
  const hideDatePicker = () => setIsDatePickerVisible(false);

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <Text
        onPress={showDatePicker}
        style={[styles.dateInput, validationError && styles.errorInput, style]}
      >
        {value?.toLocaleDateString() || 'Select a date'}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.errorText} numberOfLines={1}>
        {validationError?.message}
      </Text>
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
  dateInput: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 2,
    paddingHorizontal: 14,
    paddingVertical: 15,
    fontSize: 15,
    backgroundColor: 'white',
  },
  errorText: {
    marginTop: 4,
    fontSize: 13,
    color: 'crimson',
  },
  errorInput: {
    borderColor: 'crimson',
  },
});

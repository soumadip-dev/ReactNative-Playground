import Checkbox from 'expo-checkbox';
import { useController } from 'react-hook-form';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type CustomCheckbox = {
  name: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export default function CustomCheckbox({ name, label, style }: CustomCheckbox) {
  const {
    field: { value, onChange },
    fieldState: { error: fieldError },
  } = useController({ name });

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Checkbox style={[styles.checkBox, style]} value={value} onValueChange={onChange} />
        <Text style={styles.label}>{label}</Text>
      </View>
      {fieldError && (
        <Text style={styles.errorMessage} numberOfLines={1}>
          {fieldError.message || 'Error'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    marginVertical: 8,
    paddingHorizontal: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: '#D0D5DD',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    color: 'dimgray',
    fontWeight: '500',
    flexShrink: 1,
  },
  errorMessage: {
    color: 'crimson',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    marginTop: 5,
    marginLeft: 30,
    height: 17,
  },
});

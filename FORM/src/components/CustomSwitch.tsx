import { useController } from 'react-hook-form';
import { View, Text, Switch, StyleProp, ViewStyle, StyleSheet } from 'react-native';

type CustomSwitchProps = {
  name: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export default function CustomSwitch({ name, label, style }: CustomSwitchProps) {
  const {
    field: { value, onChange },
    fieldState: { error: validationError },
  } = useController({ name });

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Switch value={!!value} onValueChange={onChange} />
      </View>

      {validationError && <Text style={styles.error}>{validationError.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 15,
    fontWeight: '500',
    color: 'dimgray',
  },

  error: {
    marginTop: 4,
    fontSize: 13,
    color: 'crimson',
  },
});

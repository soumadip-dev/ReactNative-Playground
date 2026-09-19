import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
}

const SearchInput = ({ onClear, style, ...props }: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={COLORS.subtext} style={styles.icon} />

      <TextInput style={[styles.input, style]} placeholderTextColor={COLORS.subtext} {...props} />

      {props.value ? (
        <Ionicons
          name="close-circle"
          size={20}
          color={COLORS.subtext}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.card,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    height: '100%',
    color: COLORS.text,
    fontSize: 16,
  },

  clearIcon: {
    marginLeft: 8,
  },
});

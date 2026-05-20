import { Text, Pressable, StyleSheet, View, PressableProps } from 'react-native';
import React from 'react';

type CustomeButtonProps = {
  title: string;
  icon?: React.ReactNode;
} & PressableProps;

export default function CustomButton({ title, icon, ...pressableProps }: CustomeButtonProps) {
  return (
    <Pressable {...pressableProps} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
      {icon && <View style={styles.buttonIcon}>{icon}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#005055',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: 'absolute',
    right: 30,
  },
});

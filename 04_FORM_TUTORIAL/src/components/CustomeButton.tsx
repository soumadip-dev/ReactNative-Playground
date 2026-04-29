import { ComponentProps, forwardRef, ReactNode } from 'react';
import { Pressable, Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

type CustomButtonProps = {
  rightIcon?: ReactNode;
  title: string;

  // Allows passing custom styles from parent components.
  // StyleProp<ViewStyle> supports:
  // - normal ViewStyle objects
  // - arrays of styles
  // - conditional styles
  // Example:
  // <CustomButton style={{ marginTop: 20 }} />
  style?: StyleProp<ViewStyle>;
} &
  // Adds all built-in Pressable props automatically.
  // Examples:
  // onPress, disabled, android_ripple, hitSlop, etc.
  ComponentProps<typeof Pressable>;

const CustomButton = forwardRef<View, CustomButtonProps>(
  // forwardRef allows parent components to access
  // the internal Pressable reference directly.
  //
  // Example:
  // const buttonRef = useRef<View>(null);
  // <CustomButton ref={buttonRef} />
  //
  // Generic Types:
  // View -> Type of the forwarded ref
  // CustomButtonProps -> Type of component props

  ({ rightIcon, title, style, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={[styles.button, style]}>
        <Text style={styles.buttonText}>{title}</Text>

        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </Pressable>
    );
  }
);

CustomButton.displayName = 'CustomButton'; // Gives the component a readable name. Helpful for debugging and React DevTools.

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#005055',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 20,
  },
});

export default CustomButton;

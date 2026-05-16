import { ComponentProps, forwardRef, ReactNode } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Pressable } from 'react-native';
import { Text, useThemeColor } from '@/components/general/Themed';

type CustomButton = {
  rightIcon?: ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
  type?: 'primary' | 'outline' | 'link';
  color?: string;
} & ComponentProps<typeof Pressable>;

const CustomButton = forwardRef<View, CustomButton>(
  ({ rightIcon, title, style, type = 'primary', color, ...pressableProps }, ref) => {
    const tint = color || useThemeColor({}, 'tint');
    const bgColor = useThemeColor({}, 'background');

    return (
      <Pressable
        ref={ref}
        {...pressableProps}
        style={({ pressed }) => [
          styles.button,
          type === 'primary' && { backgroundColor: tint },
          type === 'outline' && {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: tint,
          },
          type === 'link' && { backgroundColor: 'transparent' },
          pressed && styles.buttonPressed,
          style,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            type === 'primary' && { color: '#FFFFFF' },
            type === 'outline' && { color: tint },
            type === 'link' && { color: tint },
          ]}
        >
          {title}
        </Text>
        <View style={styles.rightIconContainer}>{rightIcon}</View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default CustomButton;

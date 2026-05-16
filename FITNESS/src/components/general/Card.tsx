import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Pressable, StyleProp, ViewStyle, Platform } from 'react-native';
import { View, Text, useThemeColor } from '@/components/general/Themed';

type CardProps = {
  title: string;
  children: React.ReactNode;
  href?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ title, children, href, style }: CardProps) {
  const tint = useThemeColor({}, 'tint');
  const bgColor = useThemeColor({}, 'cardBackground');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'cardBorder');

  const cardContent = (
    <View style={[styles.cardContainer, { backgroundColor: bgColor, borderColor }, style]}>
      <View style={[styles.edgeAccent, { backgroundColor: tint }]} />
      <View style={styles.contentWrapper}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          <View style={styles.hintIcon}>
            <View style={[styles.hintDot, { backgroundColor: tint }]} />
            <View style={[styles.hintDot, { backgroundColor: tint, opacity: 0.5 }]} />
          </View>
        </View>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable
          style={({ pressed }) => [
            pressed && styles.cardPressed,
            { transform: [{ scale: pressed ? 0.99 : 1 }] },
          ]}
        >
          {cardContent}
        </Pressable>
      </Link>
    );
  }
  return cardContent;
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 28,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  edgeAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  contentWrapper: {
    padding: 24,
    paddingLeft: 20,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.5,
    flex: 1,
  },
  hintIcon: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  hintDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  childrenContainer: {
    gap: 12,
  },
  cardPressed: {
    opacity: 0.96,
  },
});

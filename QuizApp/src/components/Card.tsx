import { View, Text, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

// type Card = {
//   title: String;
//   children: React.ReactNode;
// };

type Card = PropsWithChildren<{
  title: string;
}>;

const Card = ({ title, children }: Card) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 24,
    gap: 28,
    shadowColor: '#005055',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#005055',
    lineHeight: 34,
    textAlign: 'center',
  },
});

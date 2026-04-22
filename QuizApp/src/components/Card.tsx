import { PropsWithChildren, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// type CardProps = PropsWithChildren<{
//   title: string;
// }>;

type CardProps = {
  title: string;
  children: ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{title}</Text>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical: 40,
    borderRadius: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
  },
  question: {
    fontSize: 24,
    fontWeight: '500',
  },
});

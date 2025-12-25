import { Text, View, StyleSheet } from 'react-native';

export default function AnswerOption() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is an answer option</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    letterSpacing: 0.3,
  },
});

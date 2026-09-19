import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Android Dashboard</Text>
      <Text style={styles.subtitle}>Running on Android</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f5e9',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2e7d32',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#555',
  },
});

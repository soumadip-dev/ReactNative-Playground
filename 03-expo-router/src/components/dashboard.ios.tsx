import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>iOS Dashboard</Text>
      <Text style={styles.subtitle}>Running on iOS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1565c0',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#555',
  },
});

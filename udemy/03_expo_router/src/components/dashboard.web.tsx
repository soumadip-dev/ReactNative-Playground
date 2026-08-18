import { StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Web Dashboard</Text>
      <Text style={styles.subtitle}>Running on Web</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3e0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e65100',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

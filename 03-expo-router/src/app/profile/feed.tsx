import { StyleSheet, Text, View } from 'react-native';

const FeedPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>📰</Text>
        <Text style={styles.title}>Your Feed</Text>
        <Text style={styles.subtitle}>Here you can see your latest updates.</Text>
      </View>
    </View>
  );
};

export default FeedPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 3,
  },
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitle: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});

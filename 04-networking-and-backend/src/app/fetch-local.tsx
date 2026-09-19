import { Pressable, StyleSheet, Text, View } from 'react-native';

const FetchScreen = () => {
  const handleFetchData = async () => {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      console.log(data);
      alert(JSON.stringify(data));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Fetch Data Example</Text>
      <Pressable onPress={handleFetchData} style={styles.button}>
        <Text style={styles.buttonText}>Get data</Text>
      </Pressable>
    </View>
  );
};

export default FetchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

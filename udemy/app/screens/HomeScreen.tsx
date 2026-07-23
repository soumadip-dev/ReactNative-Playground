import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Link to={{ screen: 'Profile' }} style={styles.link}>
        Go to Profile
      </Link>

      <View style={styles.button}>
        <Button onPress={() => navigation.navigate('Details')}>Go to Details</Button>
      </View>

      <View style={styles.button}>
        <Button onPress={() => navigation.navigate('Profile')}>Go to Profile</Button>
      </View>

      <View style={styles.button}>
        <Button onPress={() => navigation.navigate('Home')}>Go to Home again with navigate</Button>
      </View>

      {/* navigate won't create a new screen if Home is already focused */}
      <View style={styles.button}>
        <Button onPress={() => navigation.push('Home')}>Go to Home again with push</Button>
      </View>

      <View style={styles.button}>
        <Button onPress={() => navigation.goBack()}>Go Back</Button>
      </View>

      <View style={styles.button}>
        <Button onPress={() => navigation.popTo('Home')}>Pop to Home</Button>
      </View>

      <View style={styles.button}>
        <Button onPress={() => navigation.popToTop()}>Pop to Top</Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    marginVertical: 4,
  },
});

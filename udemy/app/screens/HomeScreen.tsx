import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.link}>Go to Profile</Text>
      </Pressable>

      <View style={styles.button}>
        <Button onPress={() => navigation.navigate('Details')}>Go to Details</Button>
        <Button onPress={() => navigation.navigate('Modal')}>Open Modal</Button>
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
    gap: 19,
  },
});

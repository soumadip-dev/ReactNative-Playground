import { View, Text, StyleSheet, Button, Pressable, Alert } from 'react-native';
import React from 'react';
import QuestionCard from '../components/QuestionCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const QuizScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>Question 1/5</Text>
        </View>

        {/* Body */}
        <View>
          <QuestionCard />
          <Text style={styles.time}>20 sec</Text>
        </View>

        {/* Footer */}
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert('pressed')}
          onLongPress={() => Alert.alert('Long Press')}
        >
          <Text style={styles.buttonText}>Next</Text>
          <FontAwesome6 name="arrow-right-long" size={16} color="white" style={styles.buttonIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FDFEF4',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: '#005055',
  },
  time: {
    textAlign: 'center',
    color: '#005055',
    marginTop: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#005055',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: 'absolute',
    right: 30,
  },
});

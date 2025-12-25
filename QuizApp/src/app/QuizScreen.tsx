import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Question 1/5</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <QuestionCard />
        <Text style={styles.time}>20 sec</Text>
      </View>

      {/* Footer */}
      <Pressable
        style={styles.button}
        onPress={() => Alert.alert('Pressed')}
        onLongPress={() => Alert.alert('Long Time Press')}
      >
        <Text style={styles.buttonText}>Next</Text>
        <FontAwesome6 name="arrow-right-long" size={18} color="white" style={styles.buttonIcon} />
      </Pressable>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    marginTop: 8,
  },
  headerText: {
    textAlign: 'center',
    color: '#005055',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#005055',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#005055',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  time: {
    textAlign: 'center',
    color: '#005055',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 24,
    letterSpacing: 1,
  },
  buttonIcon: {
    position: 'absolute',
    right: 24,
  },
});

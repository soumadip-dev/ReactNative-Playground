import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import QuestionCard from '../components/QuestionCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import questions from '../questions';
import CustomButton from '../components/CustomeButton';
const question = questions[0];

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
          <QuestionCard question={question} />
          <Text style={styles.time}>20 sec</Text>
        </View>

        {/* Footer */}
        <CustomButton
          title="Next"
          icon={<FontAwesome6 name="arrow-right-long" size={16} color="white" />}
          onPress={() => Alert.alert('pressed')}
          onLongPress={() => Alert.alert('pressed Too long')}
        />
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
});

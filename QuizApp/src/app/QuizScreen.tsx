import { View, Text, StyleSheet, Alert } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomButton from '../components/CustomeButton';
import Card from '../components/Card';
import { useQuizContext } from '../context';

const QuizScreen = () => {
  const {
    question,
    moveNextQuestion: onNext,
    score,
    numberOfQuestions,
    questionIndex,
  } = useQuizContext();

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View>
          <Text style={styles.title}>
            Question {questionIndex + 1}/{numberOfQuestions}
          </Text>
        </View>

        {/* Body */}
        {question ? (
          <View>
            <QuestionCard question={question} />
            <Text style={styles.time}>20 sec</Text>
          </View>
        ) : (
          <Card title="Well Done">
            <Text>
              Correct Answers: {score}/{numberOfQuestions}
            </Text>
            <Text>Best Score: 10</Text>
          </Card>
        )}

        {/* Footer */}
        <CustomButton
          title="Next"
          icon={<FontAwesome6 name="arrow-right-long" size={16} color="white" />}
          onPress={onNext}
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

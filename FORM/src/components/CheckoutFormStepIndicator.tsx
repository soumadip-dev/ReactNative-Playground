import { Link, useSegments } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const steps = [
  { key: 'personal', title: 'Personal' },
  { key: 'payment', title: 'Payment' },
  { key: 'confirm', title: 'Confirm' },
];

export default function CheckoutFormStepIndicator() {
  const segments = useSegments();
  const currentScreen = segments[segments.length - 1];
  const stepIndex = steps.findIndex(step => step.key === currentScreen);
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {steps.map(({ key, title }, index) => (
        <View
          key={key}
          style={[
            styles.stepContainer,
            { borderColor: stepIndex >= index ? '#005055' : 'lightgray' },
          ]}
        >
          <Link
            href={`/checkout/${key}`}
            style={[styles.link, { color: stepIndex >= index ? '#005055' : 'gray' }]}
          >
            {title}
          </Link>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 110,
    backgroundColor: '#fff',
  },
  stepContainer: {
    borderBottomWidth: 3,
    paddingBottom: 10,
    paddingHorizontal: 4,
    flex: 1,
    gap: 2,
  },
  link: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
  },
});

import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KeyboardAwareScrollView({ children }: PropsWithChildren) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={110}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
        <SafeAreaView edges={['bottom']} style={styles.safeAreaContainer}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollView: {
    backgroundColor: '#fff',
  },

  safeAreaContainer: {
    flex: 1,
  },

  scrollContentContainer: {
    flexGrow: 1,
    padding: 10,
    gap: 5,
  },
});

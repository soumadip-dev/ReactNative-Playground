import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#ffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
      }}
    >
      {/* Tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Native Tabs */}
      {/* <Stack.Screen name="(nativetabs)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}

//* Slot
// import { Slot } from 'expo-router';
// import { StyleSheet, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function RootLayout() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>My App Header</Text>
//       <Slot />
//       <Text style={styles.footer}>My App Footer</Text>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   header: {
//     fontSize: 24,
//     padding: 12,
//     textAlign: 'center',
//   },
//   footer: {
//     fontSize: 24,
//     padding: 12,
//     textAlign: 'center',
//     backgroundColor: '#f1f1f1',
//   },
// });

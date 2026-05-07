import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import CustomButton from '../components/CustomeButton';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack.Screen options={{ title: 'Home' }} />
      <Link href="/checkout" asChild>
        <CustomButton title="Checkout" />
      </Link>
    </View>
  );
}

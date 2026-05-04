import CheckoutFormProvider from '@/src/contexts/CheckoutFormProvider';
import { Stack } from 'expo-router';

export default function CheckoutLayout() {
  return (
    <CheckoutFormProvider>
      <Stack>
        <Stack.Screen name="personal" options={{ title: 'Personal' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment' }} />
        <Stack.Screen name="confirm" options={{ title: 'Confirm' }} />
      </Stack>
    </CheckoutFormProvider>
  );
}

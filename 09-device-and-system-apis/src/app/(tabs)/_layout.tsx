import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function RootLayout() {
  return (
    <NativeTabs tintColor="#38bdf8">
      <NativeTabs.Trigger name="expo-network">
        <NativeTabs.Trigger.Label>Network</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="wifi" md="wifi" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="expo-linking">
        <NativeTabs.Trigger.Label>Linking</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="link" md="link" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="expo-haptics">
        <NativeTabs.Trigger.Label>Haptics</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="iphone.radiowaves.left.and.right" md="vibration" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="expo-battery">
        <NativeTabs.Trigger.Label>Battery</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="battery.100" md="battery_full" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

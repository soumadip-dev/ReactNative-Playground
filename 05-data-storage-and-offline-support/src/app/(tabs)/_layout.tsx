import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
  return (
    <NativeTabs tintColor="#38bdf8">
      <NativeTabs.Trigger name="Asyncstorage">
        <NativeTabs.Trigger.Label>Async Storage</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="internaldrive" md="storage" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="Securestorage">
        <NativeTabs.Trigger.Label>Secure Store</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="lock.shield" md="security" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="Sqllite">
        <NativeTabs.Trigger.Label>SQLite</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="cylinder.split.1x2" md="dns" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="ExpoFileSystem">
        <NativeTabs.Trigger.Label>File System</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="folder" md="folder" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function RootLayout() {
  return (
    <NativeTabs tintColor="#38bdf8">
      <NativeTabs.Trigger name="camera-screen">
        <NativeTabs.Trigger.Label>Camera</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="camera" md="photo_camera" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="audio-screen">
        <NativeTabs.Trigger.Label>Audio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="mic" md="mic" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="image-picker">
        <NativeTabs.Trigger.Label>Image</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="photo" md="image" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

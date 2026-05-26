import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="pokedex">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'list.bullet', selected: 'list.bullet' }}
          drawable="ic_menu_sort_by_size"
          selectedColor="#E3350D"
        />
        <NativeTabs.Trigger.Label>Pokedex</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorites">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'heart', selected: 'heart.fill' }}
          drawable="star_on"
          selectedColor="#E3350D"
        />
        <NativeTabs.Trigger.Label>Favorites</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailsScreen from './screens/DetailsScreen';
import ModalScreen from './screens/model-screen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      {/* Modal screen */}
      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        options={{
          presentation: 'modal',
          title: 'Team member',
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return <RootStack />;
}

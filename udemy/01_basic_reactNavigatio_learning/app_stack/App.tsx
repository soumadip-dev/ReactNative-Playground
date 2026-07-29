import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Details from './screens/Details';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'My Home',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Profile')}
              style={{
                marginRight: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'white',
                padding: 8,
                backgroundColor: '#A5C9C9',
              }}
            >
              <Text style={{ color: 'black', fontWeight: '600' }}>Profile</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <RootStack />;
}

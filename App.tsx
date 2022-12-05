import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/home/HomeScreen';
import SigninScreen from './screens/signin/SigninScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigatorParamList } from 'types/navigator';

const Stack = createNativeStackNavigator<NavigatorParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Signin"
            component={SigninScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

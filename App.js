import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import Home from './src/Home';
import Register from './src/Register';
import 'react-native-web';

import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MyContextControllerProvider } from './src';


const Stack = createStackNavigator()

export default function App() {
  return (
    <MyContextControllerProvider>
      <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
    </MyContextControllerProvider>
    
  );
}


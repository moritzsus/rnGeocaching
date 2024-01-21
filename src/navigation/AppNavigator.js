import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../view/screens/HomeScreen';
import HideScreen from '../view/screens/HideScreen';
import SearchScreen from '../view/screens/SearchScreen';
import InfoScreen from '../view/screens/InfoScreen';
import QRScannerScreen from '../view/screens/QRScannerScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Hide"
          component={HideScreen}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScannerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

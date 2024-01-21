import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../view/screens/HomeScreen';
import HideScreen from '../view/screens/HideScreen';
import SearchScreen from '../view/screens/SearchScreen';
import InfoScreen from '../view/screens/InfoScreen';
import QRScannerScreen from '../view/screens/QRScannerScreen';
import { customStyles } from '../view/CustomStyles';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: customStyles.headerBackground,
        headerTintColor: customStyles.headerTintColor,
      }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'GeocacheApp' }}
        />
        <Stack.Screen
          name="Hide"
          component={HideScreen}
          options={{ title: 'Geocaches verstecken' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Geocaches suchen' }}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{ title: 'Einstellungen & Info' }}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScannerScreen}
          options={{ title: 'QR Code scannen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

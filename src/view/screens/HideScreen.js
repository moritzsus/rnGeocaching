import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import GoogleMap from '../components/GoogleMap';

const HideScreen = () => {
  return (
    <View style={styles.container}>
      {/* <GoogleMap /> */}
      <NavigationButton buttonText="Info" targetScreen="Info"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HideScreen;

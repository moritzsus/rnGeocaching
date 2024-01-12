import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationButton from '../components/NavigationButton';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <NavigationButton buttonText="Hide Caches" targetScreen="Hide"/>
      <NavigationButton buttonText="Search Caches" targetScreen="Search"/>
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

export default HomeScreen;

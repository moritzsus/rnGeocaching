import React,  { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationButton from '../components/NavigationButton';
import GeocacheViewModel from '../../viewmodel/GeocacheViewModel';

const HomeScreen = () => {

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await GeocacheViewModel.initializeDatabase();
      console.log('Datenbank erfolgreich initialisiert.');
    } catch (error) {
      console.error('Fehler bei der Initialisierung der Datenbank', error);
    }
  };

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

import React from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMap from '../components/GoogleMap';

const HideScreen = () => {
  return (
    <View style={styles.container}>
      <GoogleMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HideScreen;

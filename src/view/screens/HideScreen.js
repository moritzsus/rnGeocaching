import React from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMap from '../components/GoogleMap';
import GeocacheList from '../components/GeocachesList';
import FloatingButton from '../components/FloatingButton';

const HideScreen = () => {
  const [isListVisible, setListVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <GoogleMap />
      {isListVisible && (
        <GeocacheList
          geocacheType={1}
          isOverlay={true}
          onClose={() => setListVisible(!isListVisible)}
        />
      )}
      <FloatingButton text={"Geocache verstecken"} onPress={() => setListVisible(!isListVisible)} />
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

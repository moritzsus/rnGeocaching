import React from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMap from '../components/GoogleMap';
import GeocacheList from '../components/GeocachesList';
import FloatingButton from '../components/FloatingButton';
import HideScreenViewModel from '../../viewmodel/HideScreenViewModel';

const HideScreen = () => {
  const [isListVisible, setListVisible] = React.useState(false);

  const changeListVisibility = () => {
    if(HideScreenViewModel.qrOpened == true) {
      HideScreenViewModel.setQrOpened(false);
      return;
    }
    setListVisible(!isListVisible);
    console.log("St: " + isListVisible);
  }

  return (
    <View style={styles.container}>
      <GoogleMap />
      {isListVisible && (
        <GeocacheList
          geocacheType={1}
          isOverlay={true}
          //onClose={() => setListVisible(!isListVisible)}
          onClose={changeListVisibility}
        />
      )}
      {/* <FloatingButton text={"Geocache verstecken"} onPress={() => setListVisible(!isListVisible)} /> */}
      <FloatingButton text={"Geocache verstecken"} onPress={changeListVisibility} />
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

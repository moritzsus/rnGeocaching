import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleMap from '../components/GoogleMap';
import GeocacheList from '../components/GeocachesList';
import FloatingButton from '../components/FloatingButton';
import QRCodeScannerViewModel from '../../viewmodel/QRCodeScannerViewModel';
import QRScanButton from '../components/QRScanButton';

const HideScreen = () => {
  const [isListVisible, setListVisible] = React.useState(false);

  useEffect(() => {
    QRCodeScannerViewModel.setHideGeoChache(true);
  }, []);

  const changeListVisibility = () => {
    setListVisible(!isListVisible);
  }

  return (
    <View style={styles.container}>
      <GoogleMap inHideGeocachesMode={true} />
      {isListVisible && (
        <GeocacheList
          geocacheType={1}
          isOverlay={true}
          onClose={changeListVisibility}
        />
      )}
      <FloatingButton text={"Geocache verstecken"} onPress={changeListVisibility} />
      <QRScanButton hideGeocache={true}></QRScanButton>
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

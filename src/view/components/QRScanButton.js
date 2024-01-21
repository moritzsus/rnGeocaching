import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCodeScannerViewModel from '../../viewmodel/QRCodeScannerViewModel';
import { customStyles } from '../CustomStyles';

const QRScanButton = ({ hideGeocache }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    QRCodeScannerViewModel.setHideGeoChache(hideGeocache);
    navigation.navigate("QRScanner");
  };

  return (
      <TouchableOpacity style={customStyles.fabButton} onPress={handlePress}>
        <Image source={require('../../../assets/qr_scanner.png')} style={customStyles.fabIcon} />
      </TouchableOpacity>
  );
};

export default QRScanButton;

import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCodeScannerViewModel from '../../viewmodel/QRCodeScannerViewModel';

const QRScanButton = ({ hideGeocache }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    QRCodeScannerViewModel.setHideGeoChache(hideGeocache);
    navigation.navigate("QRScanner");
  };

  return (
      <TouchableOpacity style={styles.fab} onPress={handlePress}>
        <Image source={require('../../../assets/qr_scanner.png')} style={styles.icon} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#2196F3',
    borderRadius: 28,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
    elevation: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  hidden: {
    display: 'none',
  },
});

export default QRScanButton;

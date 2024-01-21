import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCodeScannerViewModel from "../../viewmodel/QRCodeScannerViewModel";
import { useNavigation } from '@react-navigation/native';

const QRScannerScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScanned = ({type, data}) => {
    setScanData(data);
    QRCodeScannerViewModel.setScannedData(data);
    QRCodeScannerViewModel.qrCodeScanned();

    navigation.goBack();
  }

  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text>Die Kamera-Berechtigung wurde verweigert.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <BarCodeScanner 
      style={StyleSheet.absoluteFillObject}
      onBarCodeScanned={scanData ? undefined : handleBarcodeScanned}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default QRScannerScreen;

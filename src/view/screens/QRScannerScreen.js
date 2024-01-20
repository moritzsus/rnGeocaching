import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCodeScannerViewModel from "../../viewmodel/QRCodeScannerViewModel";
import { useNavigation } from '@react-navigation/native';
import HideScreenViewModel from "../../viewmodel/HideScreenViewModel";

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
    console.log("Scanned: " + type + ", " + data);
    QRCodeScannerViewModel.notifyQRCodeScanned();
    HideScreenViewModel.setQrOpened(true);

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

// const QRScannerScreen = () => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);

//   useEffect(() => {
//     const checkCameraPermission = async () => {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA);
//       setHasCameraPermission(status === "granted");
//     };

//     checkCameraPermission();
//   }, []);

//   if (hasCameraPermission === null) {
//     return <View />;
//   }

//   if (hasCameraPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text>Die Kamera-Berechtigung wurde verweigert.</Text>
//       </View>
//     );
//   }

//   const handleBarcodeRead = ({ data }) => {
//     console.log(data);
//     // onQRCodeRead(data);
//   };

//   return (
//     <View style={styles.container}>
//       <RNCamera
//         style={styles.preview}
//         type={RNCamera.Constants.Type.back}
//         // onBarCodeRead={handleBarcodeRead}
//       />
//     </View>
//   );
// };

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

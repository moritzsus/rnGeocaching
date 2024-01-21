import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import QRScanButton from "../components/QRScanButton";
import GoogleMap from "../components/GoogleMap";
import QRCodeScannerViewModel from "../../viewmodel/QRCodeScannerViewModel";
import { customStyles } from "../CustomStyles";

const SearchScreen = () => {
  useEffect(() => {
    QRCodeScannerViewModel.setHideGeoChache(false);
  }, []);

  return (
    <View style={customStyles.container}>
      <GoogleMap inHideGeocachesMode={false} />

      <QRScanButton hideGeocache={false}></QRScanButton>
    </View>
  );
};

export default SearchScreen;

import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import QRScanButton from "../components/QRScanButton";
import GoogleMap from "../components/GoogleMap";
import QRCodeScannerViewModel from "../../viewmodel/QRCodeScannerViewModel";

const SearchScreen = () => {
  useEffect(() => {
    QRCodeScannerViewModel.setHideGeoChache(false);
  }, []);

  return (
    <View style={styles.container}>
      <GoogleMap inHideGeocachesMode={false} />

      <QRScanButton hideGeocache={false}></QRScanButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SearchScreen;

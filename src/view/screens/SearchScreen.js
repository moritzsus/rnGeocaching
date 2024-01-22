import React, { useEffect } from "react";
import { View } from "react-native";
import QRScanButton from "../components/QRScanButton";
import GoogleMap from "../components/GoogleMap";
import QRCodeScannerViewModel from "../../viewmodel/QRCodeScannerViewModel";
import { customStyles } from "../CustomStyles";
import InfoFab from "../components/InfoFab";

// SearchScreen liefert den Screen zurück, auf welchem man Geocaches suchen kann
const SearchScreen = () => {
  useEffect(() => {
    QRCodeScannerViewModel.setHideGeoChache(false);
  }, []);

  return (
    <View style={customStyles.container}>
      <GoogleMap inHideGeocachesMode={false} />

      <InfoFab />
      <QRScanButton hideGeocache={false}></QRScanButton>
    </View>
  );
};

export default SearchScreen;

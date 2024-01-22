import React, { useEffect } from "react";
import { View } from "react-native";
import GoogleMap from "../components/GoogleMap";
import GeocacheList from "../components/GeocachesList";
import FloatingButton from "../components/FloatingButton";
import QRCodeScannerViewModel from "../../viewmodel/QRCodeScannerViewModel";
import QRScanButton from "../components/QRScanButton";
import { customStyles } from "../CustomStyles";
import InfoFab from "../components/InfoFab";

// HideScreen liefert den Screen zurück, auf welchem man Geocaches verstecken kann
const HideScreen = () => {
  // isListVisible kontrolliert, wann die GeocacheList ein- oder ausgeblendeet werden soll
  const [isListVisible, setListVisible] = React.useState(false);

  useEffect(() => {
    QRCodeScannerViewModel.setHideGeoChache(true);
  }, []);

  const changeListVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
    <View style={customStyles.container}>
      <GoogleMap inHideGeocachesMode={true} />
      {isListVisible && (
        <GeocacheList
          geocacheType={1}
          isOverlay={true}
          onClose={changeListVisibility}
        />
      )}

      <InfoFab />
      <FloatingButton text={"Liste öffnen"} onPress={changeListVisibility} />
      <QRScanButton hideGeocache={true}></QRScanButton>
    </View>
  );
};

export default HideScreen;

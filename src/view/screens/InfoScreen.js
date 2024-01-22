import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import GeocacheList from "../components/GeocachesList";
import GoogleMapViewModel from "../../viewmodel/GoogleMapViewModel";
import MessageManager from "../../viewmodel/MessageManager";
import XMLParser from "../../viewmodel/XMLParser";
import { customStyles } from "../CustomStyles";

// InfoScreen zeigt alle Geocache Infos und Einstellungen der App an
const InfoScreen = () => {
  const [textValue, setTextValue] = useState("50");
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const backgroundImage = require("../../../assets/bg_mountains.jpg");

  useEffect(() => {
    setTextValue(GoogleMapViewModel.radius.toString());
    setIsSoundEnabled(MessageManager.audioEnabled);
  }, []);

  // Setzt den eingegeben Radius in GoogleMapViewModel
  const handleOkButtonPress = () => {
    const value = parseInt(textValue, 10);

    if (isNaN(value)) {
      MessageManager.showToastMessage(
        "Invalid input. Please enter an integer."
      );
    } else {
      GoogleMapViewModel.setRadius(value);
      MessageManager.showToastMessage("Changed radius to " + textValue);
    }
  };

  const handleToggleSwitch = () => {
    MessageManager.setIsAudioEnabled(!isSoundEnabled);
    setIsSoundEnabled(!isSoundEnabled);
  };

  const handleExportButton = () => {
    XMLParser.exportFile();
  };

  return (
    <View style={customStyles.imgContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={customStyles.backgroundImage}
      >
        {/* Radius Input */}
        <View style={customStyles.rowContainer}>
          <Text style={customStyles.label}>Radius:</Text>
          <TextInput
            style={customStyles.textInput}
            placeholder="Radius"
            value={textValue}
            onChangeText={(text) => setTextValue(text)}
          />
          <TouchableOpacity
            style={customStyles.inputOkButton}
            onPress={handleOkButtonPress}
          >
            <Text style={customStyles.inputOkButtonText}>{"OK"}</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle-Button für Ton */}
        <View style={customStyles.rowContainer}>
          <Text style={customStyles.label}>Sound:</Text>
          <Switch
            value={isSoundEnabled}
            onValueChange={handleToggleSwitch}
            trackColor={{
              false: customStyles.switchTrackColorFalse.backgroundColor,
              true: customStyles.switchTrackColorTrue.backgroundColor,
            }}
            thumbColor={
              isSoundEnabled
                ? customStyles.switchThumbColor.true
                : customStyles.switchThumbColor.false
            }
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {/* Geocache Listen */}
        <GeocacheList geocacheType={1} isOverlay={false} />
        <GeocacheList geocacheType={2} isOverlay={false} />

        {/* Export Button */}
        <TouchableOpacity
          style={customStyles.navButton}
          onPress={handleExportButton}
        >
          <Text style={customStyles.navButtonText}>Export GPX</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default InfoScreen;

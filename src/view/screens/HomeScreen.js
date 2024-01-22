import React, { useEffect } from "react";
import { View, ImageBackground } from "react-native";
import NavigationButton from "../components/NavigationButton";
import GeocacheViewModel from "../../viewmodel/GeocacheViewModel";
import { customStyles } from "../CustomStyles";

// HomeScreen zeigt den HomeScreen und bietet die Möglichkeit, zu den anderen Screens zu navigieren
const HomeScreen = () => {
  const backgroundImage = require("../../../assets/bg_mountains.jpg");

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await GeocacheViewModel.initializeDatabase();
    } catch (error) {
      console.error("Fehler bei der Initialisierung der Datenbank", error);
    }
  };

  return (
    <View style={customStyles.imgContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={customStyles.backgroundImage}
      >
        <NavigationButton
          buttonText="Geocaches verstecken"
          targetScreen="Hide"
        />
        <NavigationButton buttonText="Geocaches suchen" targetScreen="Search" />
        <NavigationButton
          buttonText="Einstellungen & Info"
          targetScreen="Info"
        />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { customStyles } from "../CustomStyles";

// InfoFab liefert einen Info FAB zurück, welcher aus der Map zum InfoScreen weiterleitet
const InfoFab = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Info");
  };

  return (
    <TouchableOpacity style={customStyles.navFabButton} onPress={handlePress}>
      <Image
        source={require("../../../assets/info.png")}
        style={customStyles.fabIcon}
      />
    </TouchableOpacity>
  );
};

export default InfoFab;

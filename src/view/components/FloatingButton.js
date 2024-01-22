import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { customStyles } from "../CustomStyles";

// FloatingButton liefert einen floating Button zurück. Man übergibt einen text, welcher im Button stehen soll
// und eine onPress callback Funktion, welche bei Drücken des Buttons aufgerufen wird
const FloatingButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={customStyles.floatingButton} onPress={onPress}>
      <Text style={customStyles.floatingButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;

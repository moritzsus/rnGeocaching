import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
} from "react-native";
import GeocacheList from "../components/GeocachesList";
import GoogleMapViewModel from "../../viewmodel/GoogleMapViewModel";
import MessageManager from "../../viewmodel/MessageManager";

const InfoScreen = () => {
  const [textValue, setTextValue] = useState("50");
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  useEffect(() => {
    setTextValue(GoogleMapViewModel.radius.toString());
    setIsSoundEnabled(MessageManager.audioEnabled);
  }, []);

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

  return (
    <View style={styles.container}>
      {/* TextInput und OK-Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Gib hier etwas ein"
          value={textValue}
          onChangeText={(text) => setTextValue(text)}
        />
        <Button title="OK" onPress={handleOkButtonPress} />
      </View>

      {/* Toggle-Button für Ton */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Ton:</Text>
        <Switch
          value={isSoundEnabled}
          onValueChange={handleToggleSwitch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSoundEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
      <GeocacheList geocacheType={1} isOverlay={false} />
      <GeocacheList geocacheType={2} isOverlay={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  geocacheContainer: {
    marginBottom: 10,
  },
  geocacheName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InfoScreen;

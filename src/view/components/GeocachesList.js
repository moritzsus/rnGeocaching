import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import GeocacheViewModel from "../../viewmodel/GeocacheViewModel";
import GoogleMapViewModel from "../../viewmodel/GoogleMapViewModel";

// geocacheType: 0 for all caches, 1 for all found caches, 2 for all hidden caches
const GeocacheList = ({ geocacheType, isOverlay, onClose }) => {
  const [geocaches, setFoundGeocaches] = useState([]);
  const [listheaderText, setListheaderText] = useState([]);

  useEffect(() => {
    // Beim Laden der Komponente die gefundenen Geocaches aus der Datenbank abrufen
    fetchFoundGeocaches();
  }, []);

  const fetchFoundGeocaches = async () => {
    try {
      let foundGeocachesData;
      switch (geocacheType) {
        case 0:
          foundGeocachesData = await GeocacheViewModel.getGeocaches();
          setListheaderText("Geocaches");
          break;
        case 1:
          foundGeocachesData = await GeocacheViewModel.getFoundGeocaches();
          setListheaderText("Gefundene Geocaches");
          break;
        case 2:
          foundGeocachesData = await GeocacheViewModel.getHiddenGeocaches();
          setListheaderText("Versteckte Geocaches");
          break;
        default:
          console.log("Invalid geocacheType. Must be 0, 1 or 2.");
      }
      setFoundGeocaches(foundGeocachesData);
    } catch (error) {
      console.error("Fehler beim Abrufen der gefundenen Geocaches", error);
    }
  };

  function handleTextPress(geocacheName) {
    //TODO cache in datenbank auf hidden setzen, position abspeichern und marker setzen
    const currentLocationLat = GoogleMapViewModel.getLocationLat();
    const currentLocationLon = GoogleMapViewModel.getLocationLon();
    const currentLocationEle = GoogleMapViewModel.getLocationEle();
    

    GeocacheViewModel.hideGeocache(
      geocacheName,
      currentLocationLat,
      currentLocationLon,
      currentLocationEle
    );
    GoogleMapViewModel.notifyGeocacheUpdate();

    onClose();
  }

  if (isOverlay) {
    // Modal-Version der Komponente
    return (
      <Modal animationType="slide" transparent={true} onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.header}>Geocache wählen</Text>
            <FlatList
              data={geocaches}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.geocacheContainer}>
                  <TouchableOpacity onPress={() => handleTextPress(item.name)}>
                    <Text style={styles.geocacheName}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableHighlight style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

  // Direkte Version der Komponente
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{listheaderText}</Text>
      <FlatList
        data={geocaches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.geocacheContainer}>
            <Text style={styles.geocacheName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 50,
  },
  content: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
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
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GeocacheList;

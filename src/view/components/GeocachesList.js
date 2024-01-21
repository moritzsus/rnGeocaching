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
import { customStyles } from "../CustomStyles";

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
        <View style={customStyles.listContainerModal}>
          <View style={customStyles.listContentModal}>
            <Text style={customStyles.listHeaderText}>Geocache wählen</Text>
            <FlatList
              data={geocaches}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={customStyles.listItemContainer}>
                  <TouchableOpacity onPress={() => handleTextPress(item.name)}>
                    <Text style={customStyles.listItemText}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableHighlight style={customStyles.closeButton} onPress={onClose}>
              <Text style={customStyles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

  // Direkte Version der Komponente
  return (
    <View style={customStyles.listContainer}>
      <Text style={customStyles.listHeaderText}>{listheaderText}</Text>
      <FlatList
        data={geocaches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={customStyles.listItemContainer}>
            <Text style={customStyles.listItemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default GeocacheList;

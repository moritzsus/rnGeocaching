import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import GeocacheViewModel from "../../viewmodel/GeocacheViewModel";
import GoogleMapViewModel from "../../viewmodel/GoogleMapViewModel";
import { customStyles } from "../CustomStyles";

// GeocacheList liefert eine Liste von Geocaches zurück. Dabei gibt es folgende Varianten:
// Modal Variante, welche eine Art Popup/Overlay der Liste zurückliefert, und eine direkte Version der Liste,
// welche man direkt in einen Screen/View einbetten kann. (Wird kontrolliert durch isOverlay)
// Man kann der Liste einen geocacheType mitgeben, um zu kontrollieren, welche Geocaches in der Liste angezeigt werden sollen:
// geocacheType: 0 für alle Geocaches, 1 für gefundene Geocaches, 2 für versteckte Geocaches
const GeocacheList = ({ geocacheType, isOverlay, onClose }) => {
  const [geocaches, setGeocaches] = useState([]);
  const [listheaderText, setListheaderText] = useState([]);

  useEffect(() => {
    fetchGeocaches();
  }, []);

  // fetchGeocaches lädt alle in der Liste benötigten Geocaches mit Hilfe des GeocacheViewModel aus der Datenbank
  const fetchGeocaches = async () => {
    try {
      let geocachesData;
      switch (geocacheType) {
        case 0:
          geocachesData = await GeocacheViewModel.getGeocaches();
          setListheaderText("Geocaches");
          break;
        case 1:
          geocachesData = await GeocacheViewModel.getFoundGeocaches();
          setListheaderText("Gefundene Geocaches");
          break;
        case 2:
          geocachesData = await GeocacheViewModel.getHiddenGeocaches();
          setListheaderText("Versteckte Geocaches");
          break;
        default:
          console.log("Invalid geocacheType. Must be 0, 1 or 2.");
      }
      setGeocaches(geocachesData);
    } catch (error) {
      console.error("Fehler beim Abrufen der gefundenen Geocaches", error);
    }
  };

  // handleTextPress teilt dem GeocacheViewModel mit, dass der geklickte Geocache versteckt werden soll
  // Die dafür nötigen Lacation Informationen werden aus dem GoogleMapViewModel geholt
  function handleTextPress(geocacheName) {
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
            <TouchableHighlight
              style={customStyles.closeButton}
              onPress={onClose}
            >
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

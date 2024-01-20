import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import GoogleMapViewModel from "../../viewmodel/GoogleMapViewModel";


const GoogleMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hiddenGeocaches, setHiddenGeocaches] = useState([]);

  useEffect(() => {
    getCurrentLocation();
    loadHiddenGeocaches();
    GoogleMapViewModel.setOnGeocacheHiddenCallback(handleGeocacheHidden);
  }, []);

  const getCurrentLocation = async () => {
    try {
      // check permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("No location permission.");
        return;
      }

      // get current location
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error("Failed to get current Location", error);
    }
  };

  const loadHiddenGeocaches = async () => {
    try {
      // Rufe die Liste der nicht gefundenen Geocaches aus GoogleMapViewModel ab
      const geocaches = await GoogleMapViewModel.getHiddenGeocaches();
      setHiddenGeocaches(geocaches);
      console.log("Loaded hidden Geocaches");
    } catch (error) {
      console.error("Fehler beim Laden der nicht gefundenen Geocaches", error);
    }
  };

  const handleUserLocationChange = async (event) => {
    const lastKnownLocation = await Location.getLastKnownPositionAsync({});

    if (lastKnownLocation) {
      let lat = lastKnownLocation.coords.latitude;
      let lon = lastKnownLocation.coords.longitude;

      GoogleMapViewModel.updateLocation(lat, lon);
    }
  };

  const handleGeocacheHidden = async () => {
    loadHiddenGeocaches();
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {
        <MapView
          style={styles.map}
          initialRegion={{
            latitude:
              currentLocation != null ? currentLocation.latitude : 49.4403,
            longitude:
              currentLocation != null ? currentLocation.longitude : 11.8633,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          onUserLocationChange={handleUserLocationChange}
        >
          {/* Markiere alle nicht gefundenen Geocaches */}
          {hiddenGeocaches.map((geocache) => (
            <Marker
              key={geocache.id.toString()}
              coordinate={{
                latitude: geocache.latitude,
                longitude: geocache.longitude,
              }}
              title={geocache.name}
            >
            </Marker>
          ))}
        </MapView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GoogleMap;

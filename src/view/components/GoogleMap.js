import React, { useEffect, useState } from "react";
import { View, ToastAndroid, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import GoogleMapViewModel from "../../viewmodel/GoogleMapViewModel";
import * as geolib from "geolib";
import MessageManager from "../../viewmodel/MessageManager";

const GoogleMap = ({ inHideGeocachesMode }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [neededGeocaches, setNeededGeocaches] = useState([]);
  const [hiddenGeocaches, setHiddenGeocaches] = useState([]);

  useEffect(() => {
    getCurrentLocation();
    loadNeededGeocaches();
    GoogleMapViewModel.setOnGeocacheUpdateCallback(handleGeocacheUpdate);
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

  const loadNeededGeocaches = async () => {
    try {
      if (inHideGeocachesMode) {
        const geocaches = await GoogleMapViewModel.getHiddenGeocaches();
        setNeededGeocaches(geocaches);
      } else {
        const geocaches = await GoogleMapViewModel.getFoundGeocaches();
        const hiddenCaches = await GoogleMapViewModel.getHiddenGeocaches();
        setNeededGeocaches(geocaches);
        setHiddenGeocaches(hiddenCaches);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Geocaches", error);
    }
  };

  const handleUserLocationChange = async (event) => {
    const lastKnownLocation = await Location.getLastKnownPositionAsync({});

    if (lastKnownLocation) {
      let lat = lastKnownLocation.coords.latitude;
      let lon = lastKnownLocation.coords.longitude;

      GoogleMapViewModel.updateLocation(lat, lon);
      calculateDistances(lat, lon);
    }
  };

  const handleGeocacheUpdate = async () => {
    loadNeededGeocaches();
  };

  const calculateDistances = (currentLat, currentLon) => {
    const currentLoc = { latitude: currentLat, longitude: currentLon };

    for (let i = 0; i < hiddenGeocaches.length; i++) {
      const geoLat = hiddenGeocaches[i].latitude;
      const geoLon = hiddenGeocaches[i].longitude;
      const geocacheLoc = { latitude: geoLat, longitude: geoLon };

      const distance = geolib.getDistance(currentLoc, geocacheLoc);

      if (distance < GoogleMapViewModel.radius) {
        MessageManager.showToastMessage(hiddenGeocaches[i].name + " is near!");
        MessageManager.textToSpeech(hiddenGeocaches[i].name + " is near!");
      }
    }
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
          {/* Markiere alle needed Geocaches */}
          {neededGeocaches.map((geocache) => (
            <Marker
              key={geocache.id.toString()}
              coordinate={{
                latitude: geocache.latitude,
                longitude: geocache.longitude,
              }}
              title={geocache.name}
            ></Marker>
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

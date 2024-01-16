import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import GeocacheViewModel from "../../viewmodel/GeocacheViewModel";

const InfoScreen = () => {
  const [geocaches, setGeocaches] = useState([]);

  useEffect(() => {
    fetchGeocaches();
  }, []);

  const fetchGeocaches = async () => {
    try {
      await GeocacheViewModel.initializeDatabase();
      const geocachesData = await GeocacheViewModel.getGeocaches();
      setGeocaches(geocachesData);
    } catch (error) {
      console.error("Fehler beim Abrufen der Geocaches", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>InfoScreen</Text>
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
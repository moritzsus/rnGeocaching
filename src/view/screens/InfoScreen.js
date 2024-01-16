import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import GeocacheViewModel from "../../viewmodel/GeocacheViewModel";
import GeocacheList from "../components/GeocachesList";

const InfoScreen = () => {

  return (
    <View style={styles.container}>
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
import SQLiteService from "../model/SQLiteService";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import builder from "xmlbuilder";

// XMLParser erstellt auf Basis der Geocache Datenbank eine XML-Datei im GPX Format und bietet an,
// diese über expo-sharing auf das lokale Gerät zu laden
class XMLParser {
  static exportFile = async () => {
    try {
      const geocaches = await SQLiteService.getGeocaches();
      const gpxData = XMLParser.convertToGPX(geocaches);
      await XMLParser.saveToFile(gpxData);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  // konvertiert die Daten aus der Datenbank in eine GPX-Datei
  // es werden nur Geocaches gespeichert, die bei latitude nicht 1000 stehen haben
  // 1000 signalisiert, dass dieses Geocache noch nie verteckt wurde und daher 'ungültig' ist
  static convertToGPX = (geocaches) => {
    const root = builder
      .create("gpx", { version: "1.0", encoding: "UTF-8" })
      .att("xmlns", "http://www.topografix.com/GPX/1/0");

    geocaches.forEach((geocache) => {
      if (geocache.latitude != 1000) {
        // 1000 invlid sign
        const wpt = root.ele("wpt", {
          lat: geocache.latitude,
          lon: geocache.longitude,
        });
        wpt.ele("name", {}, geocache.name);
        wpt.ele("ele", {}, geocache.elevation);

        if (geocache.isFound) {
          wpt.ele("desc", {}, "gefunden");
          wpt.ele("time", {}, geocache.foundTime);
        } else {
          wpt.ele("desc", {}, "nicht gefunden");
        }
      }
    });

    return root.end({ pretty: true });
  };

  // bietet die erstellte Datei zum Download an
  static saveToFile = async (xmlData) => {
    const fileName = "geocacheData.xml";
    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.writeAsStringAsync(fileUri, xmlData);
      shareAsync(fileUri);
    } catch (error) {
      console.error("Error saving GPX file:", error);
    }
  };
}

export default XMLParser;

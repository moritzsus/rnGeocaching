import SQLiteService from "../model/SQLiteService";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import builder from "xmlbuilder";

class XMLParser {
  static exportFile = async () => {
    try {
      const geocaches = await SQLiteService.getGeocaches();
      const gpxData = XMLParser.convertToGPX(geocaches);
      //console.log(gpxData);
      await XMLParser.saveToFile(gpxData);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  static convertToGPX = (geocaches) => {
    const root = builder
      .create("gpx", { version: "1.0", encoding: "UTF-8" })
      .att("xmlns", "http://www.topografix.com/GPX/1/0");

    geocaches.forEach((geocache) => {
      if (geocache.latitude != 1000) { // 1000 invlid sign
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

  static saveToFile = async (xmlData) => {
    const fileName = "geocacheData.xml";
    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.writeAsStringAsync(fileUri, xmlData);
      shareAsync(fileUri);
      console.log("GPX file saved successfully:", fileUri);
    } catch (error) {
      console.error("Error saving GPX file:", error);
    }
  };
}

export default XMLParser;

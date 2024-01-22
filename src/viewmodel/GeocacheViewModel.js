import SQLiteService from "../model/SQLiteService";
import Geocache from "../model/Geocache";
import MessageManager from "./MessageManager";

// GeocacheViewModel dient als Bindeglied zwischen Views, die Infos zu den gespeicherten Geocaches brauchen
// und der Datenbank bzw dem SQLiteService aus dem Model. GeocacheViewModel speichert zu Beginn auch alle 10 Geocaches ab
class GeocacheViewModel {
  static async initializeDatabase() {
    try {
      await SQLiteService.initializeDatabase();
    } catch (error) {
      console.error("Fehler bei der Initialisierung der Datenbank", error);
    }

    try {
      // list of geocaches
      const geocachesList = [
        "lightbulb",
        "anchor",
        "rocket",
        "chair",
        "coffee_maker",
        "watch",
        "trolley",
        "oil_barrel",
        "palette",
        "egg",
      ];

      // für alle Geocaches prüfen, ob diese bereits in der Datenbank existieren
      await Promise.all(
        geocachesList.map(async (geocacheName) => {
          const existingGeocache = await SQLiteService.getGeocacheByName(
            geocacheName
          );

          if (!existingGeocache) {
            // neuen Geocache zur Datenbank hinzufügen
            // 1000 ist Startwert und zeigt an, dass ein Geocache noch nie versteckt wurde
            const newGeocache = new Geocache(
              geocacheName,
              1000,
              1000,
              0,
              1,
              "2024-01-01 00:00:00.000"
            );

            await SQLiteService.addGeocache(newGeocache);
          }
        })
      );
    } catch (error) {
      console.error("Fehler beim Initialisieren der Geocaches", error);
    }
  }

  // neuen Geocache zur Datenbank hinzufügen
  static async addGeocache(geocacheData) {
    try {
      const existingGeocache = await SQLiteService.getGeocacheByName(
        geocacheData.name
      );

      if (existingGeocache) {
        console.warn("Ein Geocache mit diesem Namen existiert bereits.");
        return null;
      }

      const addedGeocache = await SQLiteService.addGeocache(geocacheData);
      return addedGeocache;
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Geocaches", error);
      throw error;
    }
  }

  // getGeocaches liefert alle Geocaches zurück
  static async getGeocaches() {
    try {
      const geocaches = await SQLiteService.getGeocaches();
      return geocaches;
    } catch (error) {
      console.error("Fehler beim Abrufen der Geocaches", error);
      return [];
    }
  }

  // getFoundGeocaches liefert alle gefundenen Geocaches zurück
  static async getFoundGeocaches() {
    try {
      const geocaches = await SQLiteService.getFoundGeocaches();
      return geocaches;
    } catch (error) {
      console.error("Fehler beim Abrufen der Geocaches", error);
      return [];
    }
  }

  // getHiddenGeocaches liefert alle nicht gefundenen Geocaches zurück
  static async getHiddenGeocaches() {
    try {
      const geocaches = await SQLiteService.getHiddenGeocaches();
      return geocaches;
    } catch (error) {
      console.error("Fehler beim Abrufen der Geocaches", error);
      return [];
    }
  }

  static async hideGeocache(geocacheName, lat, lon, ele) {
    try {
      await SQLiteService.hideGeocache(geocacheName, lat, lon, ele);
      MessageManager.showToastMessage("Geocache hidden: " + geocacheName);
    } catch (error) {
      console.error("Fehler beim Abrufen der Geocaches", error);
    }
  }

  static async findGeocache(geocacheName) {
    try {
      await SQLiteService.findGeocache(geocacheName);
      MessageManager.showToastMessage("Geocache found: " + geocacheName);
    } catch (error) {
      console.error("Fehler beim Finden des Geocaches", error);
    }
  }
}

export default GeocacheViewModel;

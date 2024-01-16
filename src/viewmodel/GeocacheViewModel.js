import SQLiteService from '../model/SQLiteService';
import Geocache from '../model/Geocache';

class GeocacheViewModel {
  static async initializeDatabase() {
    try {
      await SQLiteService.initializeDatabase();
    } catch (error) {
      console.error('Fehler bei der Initialisierung der Datenbank', error);
    }

    try {
        // list of geocaches
        const geocachesList = ["lightbulb", "anchor", "rocket", "chair", "coffee_maker", "watch", "trolley", "oil_barrel", "palette", "egg"];
  
        await Promise.all(
          geocachesList.map(async (geocacheName) => {
            // check if geocaches already exist
            const existingGeocache = await SQLiteService.getGeocacheByName(geocacheName);
  
            if (!existingGeocache) {
              // create new Geocache and add it to database
              const newGeocache = new Geocache(
                geocacheName,
                0,
                0,
                0,
                1,
                "2024-01-01 00:00:00.000"
              );
  
              await SQLiteService.addGeocache(newGeocache);
            }
          })
        );
  
        console.log('Initialisierung der Geocaches abgeschlossen.');
      } catch (error) {
        console.error('Fehler beim Initialisieren der Geocaches', error);
      }
  }

  static async addGeocache(geocacheData) {
    try {
      // check if geocaches already exist
      const existingGeocache = await SQLiteService.getGeocacheByName(geocacheData.name);

      if (existingGeocache) {
        console.warn('Ein Geocache mit diesem Namen existiert bereits.');
        return null;
      }

      // add new geocache to database
      const addedGeocache = await SQLiteService.addGeocache(geocacheData);
      return addedGeocache;
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Geocaches', error);
      throw error;
    }
  }

  static async getGeocaches() {
    try {
      const geocaches = await SQLiteService.getGeocaches();
      return geocaches;
    } catch (error) {
      console.error('Fehler beim Abrufen der Geocaches', error);
      return [];
    }
  }
}

export default GeocacheViewModel;

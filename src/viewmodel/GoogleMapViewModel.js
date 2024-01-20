import SQLiteService from "../model/SQLiteService";

class GoogleMapViewModel {
    static locationLat = 0;
    static locationLon = 0;

    static onGeocacheHiddenCallback = null;

    static updateLocation(lat, lon) {
        this.locationLat = lat;
        this.locationLon = lon;
    }

    static getLocationLat() {
        return this.locationLat;
    }

    static getLocationLon() {
        return this.locationLon;
    }

    static async getHiddenGeocaches() {
        try {
          // Rufe alle Geocaches mit isFound gleich 0 aus der Datenbank ab
          const unfoundGeocaches = await SQLiteService.getHiddenGeocaches();
          return unfoundGeocaches;
        } catch (error) {
          console.error('Fehler beim Abrufen der nicht gefundenen Geocaches', error);
          return [];
        }
      }

      static setOnGeocacheHiddenCallback(callback) {
        this.onGeocacheHiddenCallback = callback;
      }
    
      static notifyGeocacheHidden() {
        if (this.onGeocacheHiddenCallback) {
          this.onGeocacheHiddenCallback();
        }
      }
}

export default GoogleMapViewModel;
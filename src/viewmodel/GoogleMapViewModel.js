import SQLiteService from "../model/SQLiteService";

class GoogleMapViewModel {
  static locationLat = 0;
  static locationLon = 0;

  static radius = 50;

  static onGeocacheUpdateCallback = null;

  static setRadius(radius) {
    this.radius = radius;
  }

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
      console.error(
        "Fehler beim Abrufen der nicht gefundenen Geocaches",
        error
      );
      return [];
    }
  }

  static async getFoundGeocaches() {
    try {
      // Rufe alle Geocaches mit isFound gleich 1 aus der Datenbank ab
      const foundGeocaches = await SQLiteService.getFoundGeocaches();
      return foundGeocaches;
    } catch (error) {
      console.error("Fehler beim Abrufen der gefundenen Geocaches", error);
      return [];
    }
  }

  static setOnGeocacheUpdateCallback(callback) {
    this.onGeocacheUpdateCallback = callback;
  }

  static notifyGeocacheUpdate() {
    if (this.onGeocacheUpdateCallback) {
      this.onGeocacheUpdateCallback();
    }
  }
}

export default GoogleMapViewModel;

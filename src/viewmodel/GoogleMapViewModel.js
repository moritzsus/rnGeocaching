import SQLiteService from "../model/SQLiteService";

// GoogleMapViewModel speichert regelmäßig die aktuelle Position des Users, um diese anderen Views bei Bedarf zu liefern
// GoogleMapViewModel speichert außerdem eine Callback Funktion, die andere Views mit notifyGeocacheUpdate auslösen können,
// wenn ein Geocache in der Datenbank geupdaten wurde (wichtig um Marker neu zu zeichnen)
class GoogleMapViewModel {
  static locationLat = 0;
  static locationLon = 0;
  static locationEle = 0;

  static radius = 50;

  static onGeocacheUpdateCallback = null;

  static setRadius(radius) {
    this.radius = radius;
  }

  static updateLocation(lat, lon, ele) {
    this.locationLat = lat;
    this.locationLon = lon;
    this.locationEle = ele;
  }

  static getLocationLat() {
    return this.locationLat;
  }

  static getLocationLon() {
    return this.locationLon;
  }

  static getLocationEle() {
    return this.locationEle;
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

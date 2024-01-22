// Model für Geocaches. Enthält alle Variablen, die auch in der Datenbank vorhanden sind.
class Geocache {
  constructor(name, latitude, longitude, elevation, isFound, foundTime) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.elevation = elevation;
    this.isFound = isFound;
    this.foundTime = foundTime;
  }
}

export default Geocache;

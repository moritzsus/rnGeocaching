import * as SQLite from "expo-sqlite";
import moment from "moment";

// SQLiteService stellt die Verbindung zur Geocache Datenbank her.
// Die Klasse bietet verschiedene Funktionen um z.B. bestimmte Geocaches abzufragen oder Werte zu ändern

const db = SQLite.openDatabase("geocache.db");

class SQLiteService {
  // initializeDatabase erstellt die Geocache Datenbank, falls diese noch nicht existiert und legt die Struktur (Spalten) fest
  static async initializeDatabase() {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS geocaches (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, latitude REAL, longitude REAL, elevation REAL, isFound INTEGER, foundTime TEXT)",
            [],
            () => {
              resolve();
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // addGeocache fügt der Datenbank ein Geocache hinzu. Der Geocache wird dabei als Parameter übergeben
  // und muss der Struktur des Geocache Models aus Geocache.js entsprechen
  static async addGeocache(geocacheData) {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO geocaches (name, latitude, longitude, elevation, isFound, foundTime) VALUES (?, ?, ?, ?, ?, ?)",
            [
              geocacheData.name,
              geocacheData.latitude,
              geocacheData.longitude,
              geocacheData.elevation,
              geocacheData.isFound ? 1 : 0,
              geocacheData.foundTime,
            ],
            (_, result) => {
              resolve(result);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // getGeocacheByName überprüft ob ein Geocache mit name (übergebener Paramter) bereits
  // in der Datenbank existiert und liefert dann diesen Geocache zurück oder null falls keines mit name existiert
  static async getGeocacheByName(name) {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM geocaches WHERE name = ?",
            [name],
            (_, result) => {
              // überprüfen, ob Geocache mit name bereits in Datenbank existiert
              const geocache =
                result.rows.length > 0 ? result.rows.item(0) : null;
              resolve(geocache);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // getGeocaches liefert alle in der Datenbank gespeicherten Geocaches zurück
  static async getGeocaches() {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM geocaches",
            [],
            (_, { rows }) => {
              const geocaches = rows._array;
              resolve(geocaches);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // getFoundGeocaches liefert alle in der Datenbank gespeicherten Geocaches zurück, welche bereits gefunden wurden
  // bzw noch nie versteckt wurden
  static async getFoundGeocaches() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM geocaches WHERE isFound = 1",
          [],
          (tx, results) => {
            const foundGeocaches = [];
            for (let i = 0; i < results.rows.length; i++) {
              foundGeocaches.push(results.rows.item(i));
            }
            resolve(foundGeocaches);
          },
          (error) => {
            console.error(
              "Fehler beim Abrufen der gefundenen Geocaches",
              error
            );
            reject(error);
          }
        );
      });
    });
  }

  // getHiddenGeocaches liefert alle in der Datenbank gespeicherten Geocaches zurück, welche aktuell versteckt sind
  static async getHiddenGeocaches() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM geocaches WHERE isFound = 0",
          [],
          (tx, results) => {
            const foundGeocaches = [];
            for (let i = 0; i < results.rows.length; i++) {
              foundGeocaches.push(results.rows.item(i));
            }
            resolve(foundGeocaches);
          },
          (error) => {
            console.error(
              "Fehler beim Abrufen der gefundenen Geocaches",
              error
            );
            reject(error);
          }
        );
      });
    });
  }

  // hideGeocache setzt einen in der Datenbank gespeicherten Geocache (geocacheName) auf versteckt (isFound = 0)
  // und speichert zudem die aktuelle Position des Geocaches mit ab
  static async hideGeocache(geocacheName, lat, lon, ele) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE geocaches SET isFound = 0, latitude = ?, longitude = ?, elevation = ? WHERE name = ?",
          [lat, lon, ele, geocacheName],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  // findGeocache setzt einen in der Datenbank gespeicherten Geocache (geocacheName) auf gefunden (isFound = 1)
  // und speichert zudem die Zeit ab, an dem der Geocache gefunden wurde
  static async findGeocache(geocacheName) {
    return new Promise((resolve, reject) => {
      const foundTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE geocaches SET isFound = 1, foundTime = ? WHERE name = ?",
          [foundTime, geocacheName],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  // clearDatabase setzt die Datenbank zurück, sodass bei erneutem initialisieren alle Geocaches mit
  // den Startwerten befüllt werden
  static async clearDatabase() {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "DELETE FROM geocaches",
            [],
            (_, result) => {
              resolve();
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

export default SQLiteService;

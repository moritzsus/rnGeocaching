import * as SQLite from "expo-sqlite";
import moment from 'moment';

const db = SQLite.openDatabase("geocache.db");

class SQLiteService {
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

  static async getGeocacheByName(name) {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM geocaches WHERE name = ?",
            [name],
            (_, result) => {
              // check if geocache with given name exists
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

  static async hideGeocache(geocacheName, lat, lon) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE geocaches SET isFound = 0, latitude = ?, longitude = ? WHERE name = ?',
          [lat, lon, geocacheName],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          },
        );
      });
    })
  }

  static async findGeocache(geocacheName) {
    return new Promise((resolve, reject) => {
      const foundTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE geocaches SET isFound = 1, foundTime = ? WHERE name = ?',
          [foundTime, geocacheName],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          },
        );
      });
    });
  }

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

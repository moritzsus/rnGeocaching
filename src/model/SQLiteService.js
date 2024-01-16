import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('geocache.db');

class SQLiteService {
  static initializeDatabase() {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS geocaches (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, latitude REAL, longitude REAL, elevation REAL, isFound INTEGER, foundTime TEXT)',
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

  static addGeocache(geocacheData) {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO geocaches (name, latitude, longitude, elevation, isFound, foundTime) VALUES (?, ?, ?, ?, ?, ?)',
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

  static getGeocacheByName(name) {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM geocaches WHERE name = ?',
            [name],
            (_, result) => {
              // check if geocache with given name exists
              const geocache = result.rows.length > 0 ? result.rows.item(0) : null;
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

  static getGeocaches() {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM geocaches',
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

  static async clearDatabase() {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'DELETE FROM geocaches',
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

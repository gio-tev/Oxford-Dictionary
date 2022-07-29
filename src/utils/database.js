import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('favorites.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS favorites (
                      id INTEGER PRIMARY KEY NOT NULL,
                      word TEXT NOT NULL,
                      favIconPressed BOOLEAN NOT NULL
                  )`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

export const insertFavorite = favorite => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'INSERT INTO favorites (word, favIconPressed) VALUES(?, ?)',
        [favorite.word, favorite.favIconPressed],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const deleteFavorite = word => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'DELETE FROM favorites WHERE word = ?',
        [word],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};
// export const deleteAll = word => {
//   const promise = new Promise((resolve, reject) => {
//     database.transaction(tx => {
//       tx.executeSql(
//         'DELETE FROM favorites',
//         [],
//         (_, result) => resolve(result),
//         (_, error) => reject(error)
//       );
//     });
//   });
//   return promise;
// };

export const fetchFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM favorites',
        [],
        (_, result) => {
          const transformedFavorites = result.rows._array.map(fav => {
            return {
              word: fav.word,
              favIconPressed: true,
            };
          });

          resolve(transformedFavorites);
        },
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

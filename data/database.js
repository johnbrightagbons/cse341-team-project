const { MongoClient } = require('mongodb');

let _db;

module.exports = {
  initDb: (callback) => {
    if (_db) {
      console.warn("Database is already initialized!");
      return callback(null, _db);
    }

    const connectionString = process.env.MONGODB_URL;
    if (!connectionString) {
      return callback(new Error("MONGODB_URL is not defined in the environment variables."));
    }

    MongoClient.connect(connectionString, { useUnifiedTopology: true })
      .then(client => {
        // Optionally, select a database if needed:
        // _db = client.db(process.env.DB_NAME || 'default-db-name');
        _db = client.db(); // Uses the database specified in the connection string
        callback(null, _db);
      })
      .catch(err => {
        callback(err);
      });
  },
  getDb: () => {
    if (!_db) {
      throw Error("Database not initialized!");
    }
    return _db;
  }
};

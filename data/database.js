// cse341project2/util/database.js
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
  MongoClient.connect(process.env.MONGODB_URL)
    .then(client => {
      console.log('Connected to database!');
      // Here, the correct DB name is used from the .env file:
      _db = client.db(process.env.DB_NAME);
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDatabase = getDb;

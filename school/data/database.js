const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
let _db;

const initDb = (callback) => {
    if (_db) {
        console.log("Database is already initialized!");
        return callback(null, _db);
    }
    console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI);
    MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            _db = client.db();
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};
const dotenv = require('dotenv') // Implement dotenv
dotenv.config(); // Initilizes dotenv

const { MongoClient } = require('mongodb'); // Import MongoCleint
let _db; // Initiliaze databse

const initDb = (callback) => { // Initializes database
    if (_db) {   // Check if database is already initialized
        console.log("Database is already initialized!");  // Log message
        return callback(null, _db); // Return callback
    }
    console.log('Connecting to MongoDB with URI:', process.env.MONGODB_URI); // Log the connection string
    MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connect to MongoDB
        .then((client) => { // If successful
            _db = client.db(); // Set database to client.db() with the database name
            callback(null, _db);  // Return callback
        })
        .catch((err) => {  // If error
            callback(err); // Return callback
        });
};
const getDb = () => { // Get database
    if (!_db) { // If database is not initialized
        throw Error('Database not initialized') // Throw error
    }
    return _db;  // Return database
};

module.exports = {  // Export module
    initDb,  // Initialize database
    getDb,  // Get database
};
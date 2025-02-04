// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add this line
const app = express();

// Set the port number from environment variables or default to 8080
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the school API!');
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`School API running on Port ${PORT}`));
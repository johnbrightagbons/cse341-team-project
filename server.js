// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add this line
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();

// Set the port number from environment variables or default to 8080
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'School API',
            version: '1.0.0',
            description: 'API for managing school data'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local server'
            }
        ]
    },
    apis: ['./school/routes/school.js']

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the school API!');
});

const { initDb } = require('./school/data/database'); // Import the initDb function

// Initialize the database
initDb((err, db) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the process if the database connection fails
    }

    // Start the server and listen on the specified port
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`School API running on Port ${PORT}`));
});

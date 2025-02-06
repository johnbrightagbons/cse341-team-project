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
    apis: ['./school-api/controllers/studentst.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the school API!');
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`School API running on Port ${PORT}`));
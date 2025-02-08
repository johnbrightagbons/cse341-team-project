const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { initDb } = require('./school/data/database');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

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
<<<<<<< HEAD
    apis: ['./school/routes/*.js']
=======
    apis: ['./school/routes/school.js']

>>>>>>> a55027dc000feb9b2497f133bc499c3dad27f042
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const studentsRoute = require('./school/routes/students');
app.use('/students', studentsRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the school API!');
});

<<<<<<< HEAD
initDb((err) => {
    if (err) {
        console.error('Failed to initialize database', err);
        process.exit(1);
    } else {
        app.listen(port, () => console.log(`School API running on Port ${port}`));
    }
});
=======
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
>>>>>>> a55027dc000feb9b2497f133bc499c3dad27f042

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
    apis: ['./school/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const studentsRoute = require('./school/routes/students');
app.use('/students', studentsRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the school API!');
});

initDb((err) => {
    if (err) {
        console.error('Failed to initialize database', err);
        process.exit(1);
    } else {
        app.listen(port, () => console.log(`School API running on Port ${port}`));
    }
});
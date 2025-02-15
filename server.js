const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongodb = require('./data/database');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE SETUP --- //

// Parse JSON request bodies
app.use(bodyParser.json());

// Configure CORS (adjust origin if your client is hosted elsewhere)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// --- ROUTES & API DOCUMENTATION --- //

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Log the MongoDB URL for debugging (make sure it's not undefined)
console.log("MongoDB URL:", process.env.MONGODB_URL);

// --- DATABASE CONNECTION & SERVER START --- //

mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Failed to connect to the database:', err);
  } else {
    console.log('✅ Database connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
});

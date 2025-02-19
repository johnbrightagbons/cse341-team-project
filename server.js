const app = require('./index'); // Import the configured app
const mongodb = require('./data/database');

const PORT = process.env.PORT || 10000;

// Connect to the database and start the server
mongodb.mongoConnect((err) => {
  if (err) {
    console.error('❌ Failed to connect to the database:', err);
  } else {
    console.log('✅ Database connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
});

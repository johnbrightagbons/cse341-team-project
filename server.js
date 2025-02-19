const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongodb = require('./data/database'); // Custom MongoDB connection module
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const GitHubStrategy = require('passport-github2').Strategy;
const errorHandler = require('./middleware/errorHandler');
const { isAuthenticated } = require('./middleware/authenticate');
const routes = require('./routes/index');

const app = express();
module.exports = app;
const PORT = process.env.PORT || 10000;

// --- MIDDLEWARE SETUP --- //

// Parse JSON request bodies
app.use(bodyParser.json());

// Log environment variables to verify they're loaded correctly
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET);
console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
console.log('CALLBACK_URL:', process.env.CALLBACK_URL);

// CORS configuration: allow your deployed domain and local dev
app.use(cors({
  origin: ['https://cse341-team-project-xt32.onrender.com', 'http://localhost:3000'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session configuration using MongoDB as the store
app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  proxy: true, // Needed if behind a proxy (e.g., Render)
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    sameSite: 'lax'
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    ttl: 14 * 24 * 60 * 60, // 14 days in seconds
  }),
}));

// Initialize Passport and use session support
app.use(passport.initialize());
app.use(passport.session());

// --- PASSPORT CONFIGURATION --- //

// Configure the GitHub strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL.trim()
},
(_accessToken, _refreshToken, profile, done) => {
  console.log("GitHub Strategy Callback - Profile:", profile);
  // Here, you can process or save the user data to your DB as needed.
  return done(null, profile);
}));

// Serialize and deserialize user for session persistence
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// --- ROUTES & API DOCUMENTATION --- //

// Serve Swagger API docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use custom routes from index.js
app.use('/', routes);

// Route to initiate GitHub authentication
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route: ensure session is saved before redirecting
app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    req.session.save(() => {
      console.log("User after GitHub callback:", req.user);
      res.redirect('/');
    });
  }
);

// Home route to display login status; uses username or displayName as fallback
app.get('/', (req, res) =>
  res.send(req.isAuthenticated() ? `Logged in as ${req.user.username || req.user.displayName}` : "Logged Out")
);

// --- DEBUG MIDDLEWARE --- //
// Logs session and user details on every request (remove this in production)
app.use((req, res, next) => {
  console.log("Request session:", req.session);
  console.log("Request user:", req.user);
  next();
});

// Protected route example
app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.user });
});

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// --- DATABASE CONNECTION & SERVER START --- //
// Connect to the database using your custom module and start the server
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


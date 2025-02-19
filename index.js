const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const GitHubStrategy = require('passport-github2').Strategy;
const errorHandler = require('./middleware/errorHandler');
const { isAuthenticated } = require('./middleware/authenticate');
const routes = require('./routes/index');

const app = express();

// --- MIDDLEWARE SETUP --- //

app.use(bodyParser.json());

app.use(cors({
  origin: ['https://cse341-team-project-xt32.onrender.com'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(session({
  secret: process.env.GITHUB_CLIENT_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    ttl: 14 * 24 * 60 * 60,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL.trim()
},
(_accessToken, _refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// --- ROUTES & API DOCUMENTATION --- //

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    req.session.save(() => {
      res.redirect('/');
    });
  }
);

app.get('/', (req, res) =>
  res.send(req.isAuthenticated() ? `Logged in as ${req.user.username || req.user.displayName}` : "Logged Out")
);

app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.user });
});

app.use(errorHandler);

module.exports = app; // Export the app instance only

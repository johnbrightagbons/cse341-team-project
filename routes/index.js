const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware to log session and user data
router.use((req, res, next) => {
  console.log("Session data:", req.session);
  console.log("Authenticated user:", req.user);
  next();
});

// Importing other route files
router.use('/academicDetails', require('./academicDetails'));
router.use('/classInfo', require('./classInfo'));
router.use('/finances', require('./finances'));
router.use('/students', require('./students'));

// Login route: triggers GitHub authentication
router.get('/login', passport.authenticate('github', { scope: ['user'] }));

// GitHub callback route
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (_req, res) => {
    console.log('GitHub authentication successful');
    res.redirect('/');
  }
);

// Logout route: logs the user out and clears the session
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
});

module.exports = router;

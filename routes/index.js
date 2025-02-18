const express = require('express');
const router = express.Router();
const passport = require('passport');


router.use('/academicDetails', require('./academicDetails'));
router.use('/classInfo', require('./classInfo'));
router.use('/finances', require('./finances'));
router.use('/students', require('./students'));

// Login route: triggers GitHub authentication.
router.get('/login', (req, res, next) => {
    console.log('Login route hit');
    passport.authenticate('github')(req, res, next);
  });
  
  // GitHub callback route
  router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    (_req, res) => {
      console.log('GitHub authentication successful');
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );
  
  // Logout route: logs the user out and clears the session.
  router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });

module.exports = router; 

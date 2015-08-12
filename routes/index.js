var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next){
  res.redirect('/home');
})

//this is going to be our view when the user is logged in
router.get('/home', isLoggedIn, function(req, res, next) {
  console.log(reg.user);
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/login', function(req, res, next){
  res.render('login', {title: 'Log in'});
});

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/login');
});

router.get('/auth/facebook', passport.authenticate('facebook',
 {scope:
  ['email', 'user_birthday', 'user_location']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook',{
  successRedirect: '/home',
  failureRedirect: '/login'
}));

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;

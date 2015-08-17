var express = require('express');
var router = express.Router();
var accountValidation = require('../lib/javascripts/accountValidation.js');
var mongoCalls = require('../lib/javascripts/mongoCalls.js');
var bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//getting login page
router.get('/accountLogin', function(req, res, next) {
  res.render('accountLogin');
});

//getting acount creation page
router.get('/accountCreate', function(req, res, next) {
  res.render('accountCreate');
});

//getting account information page
router.get('/account', function(req, res, next) {
  res.render('account');
});

router.post('/', function(req, res, next) {
  var command = req.body.textWriterIndexCommand;
  if(command.toLowerCase().trim() === 'login') {
    res.redirect('/accountLogin');
  } else if (command.toLowerCase().trim() === 'create') {
    res.redirect('/accountCreate');
  }
});

router.post('/accountCreate', function(req, res, next) {
  var errors = accountValidation.newUser(req);
  if(errors.length !== 0) {
    res.render('/accountCreate', {errors: errors});
  } else {
    return mongoCalls.doesUsernameExist(req).then(function(user) {
      if(user) {
        errors.push('Username exists.');
        res.render('accountCreate', {errors: errors});
      } else {
        mongoCalls.addNewUser(req);
        res.redirect('/accountLogin');
      }
    });
  }
});

// router.post('/accountCreate', function(req, res, next) {
//   var errors = accountValidation.newUser(req);
//   var username = mongoCalls.doesUsernameExists(req);
//   console.log(username);
//   if(errors.length !== 0) {
//     res.render('accountCreate', {errors: errors});
//   } else {
//     if(username.length !== 0) {
//       errors.push('Username already exists.');
//       res.render('accountCreate', {errors: errors});
//     } else if (username.length === 0){
//       console.log('inelse');
//       mongoCalls.addNewUser(req);
//       res.redirect('/accountLogin');
//     }
//   }
// });

router.post('/accountLogin', function(req, res, next) {
  var errors = accountValidation.userLogin(req);
  var login = mongoCalls.checkLogin(req);
  console.log(login);
  if(errors.length !== 0) {
    res.render('accountLogin', {errors: errors});
  } else {
    if(login) {
      res.render('accountLogin');
    }
  }
  // res.redirect('/account');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var accountValidation = require('../lib/javascripts/accountValidation.js');
var mongoCalls = require('../lib/javascripts/mongoCalls.js');
var bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'txtWriter 8)' });
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
router.get('/accountUser', function(req, res, next) {
  res.render('accountUser');
});

router.get('/newTxt', function(req, res, next) {
  res.render('newTxt');
});

router.get('/publicTxtFeed', function(req, res, next) {
  res.render('publicTxtFeed');
});

router.get('/userTxts', function(req, res, next) {
  res.render('userTxts');
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
  mongoCalls.createAccount(req).then(function(errors) {
    if(errors) {
      res.render('accountCreate', {errors: errors});
    } else {
      res.redirect('/accountLogin');
    }
  });
});

router.post('/accountLogin', function(req, res, next) {
  mongoCalls.accountLogin(req).then(function(errors) {
    if(errors) {
      res.render('accountLogin', {errors: errors});
    } else {
      res.redirect('/accountUser');
    }
  });
});

router.post('/accountUser', function(req, res, next) {
  var userCommand = req.body.textWriterIndexCommand;
  //call on mongocalls js file goes here to populate second column on page with shit
  if(userCommand.toLowerCase().trim() === 'new' || userCommand.toLowerCase().trim() === 'create') {
    res.redirect('/newTxt');
  } else if (userCommand.toLowerCase().trim() === 'public' || userCommand.toLowerCase().trim() === 'feed' || userCommand.toLowerCase.trim() === 'public feed') {
    res.redirect('/publicTxtFeed');
  }

});
router.post('/newTxt', function(req, res, next) {
  var ta = req.body.newTxtTA;
  var errors = accountValidation.newTxt(req, ta);
  console.log(errors);
  if(errors.length === 0) {
    mongoCalls.saveNewTxt(req, ta);
    console.log('ayyyy');
    res.redirect('/publicTxtFeed');
  } else {
    console.log('nooo');
    res.render('newTxt', {errors: errors});
  }

});

module.exports = router;

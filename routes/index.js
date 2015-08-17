var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/textWriter');
var accountValidation = require('../lib/javascripts/accountValidation.js');
var mongoCalls = require('../lib/javascripts/mongoCalls.js');

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

//posting on index
router.post('/', function(req, res, next) {
  var command = req.body.textWriterIndexCommand;
  command.toLowerCase().trim();
  if(command === 'login') {
    res.redirect('/accountLogin');
  } else if (command === 'create') {
    res.redirect('/accountCreate');
  }
});

//posting when creating an accountLogin
router.post('/accountCreate', function(req, res, next) {
  var username = req.body.textWriterNewUsername;
  var pass1 = req.body.textWriterNewPassword;
  var pass2 = req.body.textWriterNewPassword2;
  var userCheck = accountValidation.usernameCheck(username);
  var errors = accountValidation.newAccountValidation(username, pass1, pass2);
  console.log(userCheck);
  console.log(errors);
  if(errors.length > 0) {
    res.render('account',{errors: errors});
  } else {
    res.redirect('/account');
  }
});


module.exports = router;

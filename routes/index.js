var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/textWriter');
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
    res.redirect('/accountCreate')
  }
})


module.exports = router;

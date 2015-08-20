var express = require('express');
var router = express.Router();
var accountValidation = require('../lib/javascripts/accountValidation.js');
var mongoCalls = require('../lib/javascripts/mongoCalls.js');
var txtValidation = require('../lib/javascripts/txtValidation.js');
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

router.get('/showEntry', function(req, res, next) {
  res.render('showEntry');
});

//getting account information page
router.get('/accountUser', function(req, res, next) {
  res.render('accountUser');
});

router.get('/newTxt', function(req, res, next) {
  res.render('newTxt');
});

router.get('/likedEntry', function(req, res, next) {
  res.render('likedEntry');
});

router.get('/publicTxtFeed', function(req, res, next) {
  mongoCalls.findAllEntries(req).then(function(documents) {
    res.render('publicTxtFeed', {documents: documents});
  });
});

router.get('/userTxts', function(req, res, next) {
  mongoCalls.userEntries(req).then(function(documents) {
    res.render('userTxts', {documents: documents});
  });

});

router.get('/showEntry/:id', function(req, res, next) {
  mongoCalls.showEntry(req).then(function(entry) {
    res.render('showEntry', {entry: entry});
  });
});

router.post('/editEntry/:id', function(req, res, next) {
  mongoCalls.editEntry(req).then(function(updated) {
    res.redirect('/userTxts');
  });
});

router.get('/addToEntry/:id/', function(req, res, next) {
  mongoCalls.showEntry(req).then(function(entry) {
    res.render('addtoEntry', {entry: entry});
  });
});

router.get('/likeAnEntry/:id', function(req, res, next) {
  mongoCalls.showEntry(req).then(function(entry) {
    res.render('likeAnEntry', {entry: entry});
  });
});

router.post('/updateEntry/:id', function(req, res, next) {
  mongoCalls.addToEntry(req).then(function(updated) {
    res.redirect('/publicTxtFeed');
  });
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
  var userCommand = (req.body.tWCMD).toLowerCase().trim();
  if(userCommand === 'new' || userCommand === 'create') {
    res.redirect('/newTxt');
  } else if (userCommand === 'public' || userCommand === 'feed' || userCommand === 'public feed') {
    res.redirect('/publicTxtFeed');
  }
});
router.post('/newTxt', function(req, res, next) {
  var ta = req.body.newTxtTA;
  var errors = accountValidation.newTxt(req, ta);
  if(errors.length === 0) {
    mongoCalls.saveNewTxt(req, ta);
    res.redirect('/userTxts');
  } else {
    res.render('newTxt', {errors: errors});
  }
});

router.post('/likeAnEntry/:id', function(req, res, next) {
  mongoCalls.likeEntry(req).then(function(user) {
    res.redirect('/userTxts');
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/textWriter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//getting login page
router.get('/accountLogin', function(req, res, next) {
  res.render('accountLogin');
});

router.get('/accountCreate', function(req, res, next) {
  res.render('accountCreate');
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
})


module.exports = router;

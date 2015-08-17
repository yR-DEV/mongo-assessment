var db = require('monk')('/localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');
var accountValidation = require('./accountValidation');

mongoCalls = {

  textWriterAddNewUser: function(req) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.textWriterNewPassword, salt, function(err, hash) {
        return textWriterAccounts.findOne({username: req.body.textWriterAddNewUser})
        .then(function(user) {
          return accountValidation.newAccountValidation(req, user)
          .then(function(errors) {
            console.log("here",errors);
            if(errors.length !== 0) {
              return errors;
            } else {
              console.log("here");
              return textWriterAccounts.insert({username: req.body.textWriterNewUsername, password: hash});
              req.session.username = req.body.textWriterNewUsername;
            }
          });
        });
      });
    });
  },
  // textWriterAddNewUser2: function(req) {
  //   var hash = bcrypt.hashSync(req.body.textWriterNewPassword, 10);
  //   return textWriterAccounts.findOne({username: req.body.textWriterNewUsername})
  //     .then(function(user) {
  //       return accountValidation(req, )
  //     })
  // },
},


module.exports = mongoCalls;


// var hash = bcrypt.hashSync(req.body.textWriterNewPassword, 10);
// return textWriterAccounts.findOne({username: req.body.textWriterNewUsername})
// .then(function(user) {
//   return accountValidation.newAccountValidation(req, user);
// })
// .then(function(errors) {
//   if(errors.length === 0){
//     textWriterAccounts.insert({username: req.body.textWriterNewUsername, password: hash});
//     req.session.username = req.body.textWriterNewUsername;
//     return false;
//   } else {
//     return errors;
//   }
// });

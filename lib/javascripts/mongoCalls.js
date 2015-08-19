var db = require('monk')('localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');
var textWriterEntries = db.get('txtEntries');
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');
var accountValidation = require('./accountValidation');

var mongoCalls = {

  addNewUser: function(req) {
    var desiredUsername = req.body.textWriterNewUsername;
    var hash = bcrypt.hashSync(req.body.textWriterNewPassword, 10);
    textWriterAccounts.insert({username: desiredUsername, password: hash});
    req.session.username = desiredUsername;
  },

  createAccount: function(req) {
    var hash = bcrypt.hashSync(req.body.textWriterNewPassword, 10);
    return textWriterAccounts.findOne({username: req.body.textWriterNewUsername})
      .then(function(user){
        // console.log(user);
          return accountValidation.newUser(req, user);
      }).then(function(errors) {
        if(errors.length === 0) {
          textWriterAccounts.insert({username: req.body.textWriterNewUsername, password: hash});
          req.session.username = req.body.textWriterNewUsername;
          return false;
        } else {
          return errors;
        }
      }).end(function(error) {
        throw error;
      });
  },

  accountLogin: function(req) {
    var usernameLogin = req.body.textWriterUsernameLogin;
    var passwordLogin = req.body.textWriterPasswordLogin;
    return textWriterAccounts.findOne({username: usernameLogin})
      .then(function(user) {
        return accountValidation.userLogin(req, user);
      }).then(function(errors) {
        if(errors.length === 0) {
          return;
        } else {
          return errors;
        }
      });
  },

  saveNewTxt: function(req) {
    console.log(req.body.newTextTA);
  }
  //
  // checkLogin: function(req) {
  //   var errorArr = [];
    // var usernameLogin = req.body.textWriterUsernameLogin;
    // var passwordLogin = req.body.textWriterPasswordLogin;
  //   return textWriterAccounts.findOne({username: usernameLogin})
  //   .then(function(user) {
  //     console.log(user);
  //     var passwordCheck = bcrypt.compareSync(passwordLogin, user.password);
  //     if(passwordCheck) {
  //       return errorArr;
  //     } else if(!passwordCheck) {
  //       errorArr.push('Password incorrect.')
  //     }
  //   });
  //   return errorArr;
  // }
};


module.exports = mongoCalls;

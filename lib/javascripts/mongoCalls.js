var db = require('monk')('localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');
var accountValidation = require('./accountValidation');

mongoCalls = {

  addNewUser: function(req) {
    var desiredUsername = req.body.textWriterNewUsername;
    var hash = bcrypt.hashSync(req.body.textWriterNewPassword, 10);
    textWriterAccounts.insert({username: desiredUsername, password: hash});
    req.session.username = desiredUsername;
  },

  doesUsernameExist: function(req) {
    var errorArr = [];
    var user = {};
    return textWriterAccounts.findOne({username: req.body.textWriterNewUsername})
    .then(function(user){
      return user;
    })  
  },
  //
  // checkLogin: function(req) {
  //   var errorArr = [];
  //   var usernameLogin = req.body.textWriterUsernameLogin;
  //   var passwordLogin = req.body.textWriterPasswordLogin;
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
}


module.exports = mongoCalls;

var db = require('monk')('localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');
var textWriterEntries = db.get('textEntries');
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
          textWriterAccounts.insert({username: req.body.textWriterNewUsername, password: hash, txts: []});
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
          req.session.username = req.body.textWriterUsernameLogin;
          // console.log(req.session.username);
          return;
        } else {
          return errors;
        }
      });
  },


  //In this function I need to
  //all done with promises
  //insert the document into its own collection
  //save the user's ID in that document so that I can reference it
  //enter the documents ID into the user's entry in the DB
  //so I can dislay ownership and whatnot
  saveNewTxt: function(req, ta) {
    var tempUserId = "";
    var errors = [];
    console.log(req.session.username);
    return textWriterAccounts.findOne({username: req.session.username})
    .then(function(user) {
      console.log(user);
      tempUserId = user._id;
      return tempUserId;
    }).then(function(tempUser) {
      return textWriterEntries.insert({txt: ta, owner: tempUser, contributors: []});
    }).then(function(entered) {
      return textWriterEntries.findOne({owner: tempUser});
    }).then(function(txtEntry) {
      return textWriterAccounts.update({_id: user._id}, {$in: {
                                        txts: txtEntry._id
      }});
    });
  },

  findMyTxts: function(req) {
    var tempUserId = "";
    return textWriterAccounts.findOne({username: req.session.username}).then(function(user) {
      tempUserId = user._id;
      return tempUserId;
    }).then(function(tempUser) {
      return textWriterEntries.findOne({owner: tempUser});
    }).then(function(doc) {
      return doc;
    });
  }


};


module.exports = mongoCalls;

var db = require('monk')('localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');
var textWriterEntries = db.get('textWriterEntries');
var textWriterLikesAndWrites = db.get('textWriterlikesAndWrites');

var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session');
var accountValidation = require('./accountValidation');
var txtValidation = require('./txtValidation');

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

  saveNewTxt: function(req, ta) {
    var tempUserId = "";
    var errors = [];
    var tmpTxtId = '';
    // console.log(req.session.username);
    return textWriterAccounts.findOne({username: req.session.username})
    .then(function(user) {
      return textWriterEntries.insert({entry: ta, owner: user._id});
    }).then(function(entry) {
      // console.log(entry);
      tmpTxtId = entry._id;
      textWriterAccounts.findOne({username: req.session.username})
      .then(function(user) {
        return textWriterAccounts.update({_id: user._id}, {$push: {txts: tmpTxtId}});
      });
    });
  },

  userEntries: function(req) {
    var tempEntries = [];
    var tmpStr = "";
    return textWriterAccounts.findOne({username: req.session.username})
    .then(function(owner) {
      return owner.txts;
    }).then(function(ownerDocs) {
      return textWriterEntries.find({_id: {$in: ownerDocs}});
    }).then(function(docs) {
      // console.log(docs);
      return docs;
    });
  },

  findAllEntries: function(req) {
    return textWriterEntries.find({});
  },

  showEntry: function(req) {
    return textWriterEntries.findOne({_id: req.params.id}).then(function(entry) {
      console.log(entry);
      return entry;
    });
  },


};


module.exports = mongoCalls;

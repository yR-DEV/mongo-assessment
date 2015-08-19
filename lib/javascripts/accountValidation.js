var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');
var bcrypt = require('bcrypt');

var accountValidation = {

  newUser: function(req, user) {
    var errors = [];
    var username = req.body.textWriterNewUsername;
    var password1 = req.body.textWriterNewPassword;
    var password2 = req.body.textWriterNewPassword2;

    if(username.trim().length === 0) {
      errors.push('You cannot leave the Username field blank.');
    }
    if(password1.trim().length === 0) {
      errors.push('You cannot leave the Password field blank.');
    }
    if(password2.trim().length === 0) {
      errors.push('You cannot leave the Password field blank.');
    }
    if(password1.trim().length < 5) {
      errors.push('Your password must be greater than 5 characters.');
    }
    if(password1.trim() != password2.trim()) {
      errors.push('Your Passwords Do Not Match.');
    }
    if(user) {
      errors.push('Username already exists.');
    }
    return errors;
  },

  userLogin: function(req, user) {
    var errors = [];
    var username = req.body.textWriterUsernameLogin;
    var password = req.body.textWriterPasswordLogin;

    if(!user) {
      errors.push('This user was not found');
    } else {
      if(username.toLowerCase().trim() === '') {
        errors.push('Username field left blank');
      }
      if(password.toLowerCase().trim() === ''){
        errors.push('Password field left blank');
      }
      var hashCompare = bcrypt.compareSync(password, user.password);
      if(!hashCompare) {
        errors.push('Incorrect Password');
      }
    }
    return errors; 
  },

  newTxt: function(req, ta) {
    var errors = [];
    if(ta === ''){
      errors.push("You cannot leave the entire text area blank.");
    }
    return errors;
  }
};

module.exports = accountValidation;

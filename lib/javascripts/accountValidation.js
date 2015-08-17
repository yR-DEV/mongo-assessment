var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');
var bcrypt = require('bcrypt');
var mongoCalls = require('./mongoCalls.js');

accountErrors = {

  newUser: function(req) {
    // console.log(msg);
    var errorArr = [];
    var username = req.body.textWriterNewUsername;
    var password1 = req.body.textWriterNewPassword;
    var password2 = req.body.textWriterNewPassword2;

    if(username.trim().length === 0) {
      errorArr.push('You cannot leave the Username field blank.');
    }
    if(password1.trim().length === 0) {
      errorArr.push('You cannot leave the Password field blank.');
    }
    if(password2.trim().length === 0) {
      errorArr.push('You cannot leave the Password field blank.');
    }
    if(password1.trim().length < 5) {
      errorArr.push('Your password must be greater than 5 characters.');
    }
    if(password1.trim() != password2.trim()) {
      errorArr.push('Your Passwords Do Not Match.');
    }
    return errorArr;
  },

  userLogin: function(req) {
    var errors = [];
    if(req.body.textWriterUsernameLogin === '' || req.body.textWriterPasswordLogin === '') {
      errors.push('Blank Fields.');
    }
    return errors;
  }

};

module.exports = accountErrors;

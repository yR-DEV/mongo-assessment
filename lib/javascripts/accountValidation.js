var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');

accountErrors = {

  newAccountValidation: function(username, password1, password2) {
    var errorArr = [];

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

  loginValidation: function(req) {
    var errors = [];
    if(req.body.textWriterUsernameLogin === '' || req.body.textWriterPasswordLogin === '') {
      errors.push('Blank Fields.');
    }
    if(!bcrypt.compareSync(req.body.textWriterPasswordLogin, user.password)) {
      errors.push('Wrong Password.');
    }
    if(!user) {
      errors.push('Username not found.');
    }
    return errors;
  }

};

module.exports = accountErrors;

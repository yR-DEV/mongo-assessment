var db = require('monk')('/localhost/textWriter');
var textWriterAccounts = db.get('textWriterAccounts');

mongoCalls = {

  textWriterAddUser: function(username, password) {

  }


};

module.exports = mongoCalls;

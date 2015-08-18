var txtValidation = {
  newTxt: function(req) {
    var errors = [];
    if(req.body.newTxtTA === '') {
      errors.push('How can you leave this blank canvas on which to write your thoughts and secrets and feelings?!');
    }
    return errors;
  }
}

module.exports = txtValidation;

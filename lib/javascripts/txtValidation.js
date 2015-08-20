var txtValidation = {
  newTxt: function(req) {
    var errors = [];
    if(req.body.newTxtTA === '') {
      errors.push('How can you leave this blank canvas on which to write your thoughts and secrets and feelings?!');
    }
    return errors;
  },

  splitText: function(arr) {
    var finalArr = [];
    var tempStr = ""
    arr.forEach(function(entry) {
      // console.log(entry);
      tempStr = entry;
      tempStr.split(/\r|\n|\r\n|\n\r/, "<br />");
      console.log(tempStr);
      finalArr.push(tempStr);
    });
    // console.log(finalArr);
    // console.log(finalArr);
    return finalArr;
  }
};

module.exports = txtValidation;

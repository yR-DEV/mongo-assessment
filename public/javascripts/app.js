$(document).ready(function() {
  $("#newTxtTA").keydown(function(e) {
    if(e.keyCode === 13 || e.charCode === 13) {
      e.preventDefault();
      return false;
    }
  });
});

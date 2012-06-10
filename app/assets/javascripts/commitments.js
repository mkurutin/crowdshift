$(document).ready(function() {
  var dtpOptions = {
    dateFormat: "yy-mm-dd",
    separator: " ",
    timeFormat: "hh:mm"
  }
  $('.commitment-start-date input').datetimepicker(dtpOptions);
  $('.commitment-end-date input').datetimepicker(dtpOptions);
});

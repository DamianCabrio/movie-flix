function showAlert(alert, message, timer = null) {
    alert.fadeIn(200);
    alert.html(message);
  
    if (timer != null) {
      setTimeout(function () {
        hideAlert(alert);
      }, timer);
    }
  }
  
  function hideAlert(alert) {
    alert.fadeOut(200);
  }

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
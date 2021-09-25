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
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

function displayMovieCard(movie, divPeliculas) {
  divPeliculas.append(`<div class="col">
<div class="card h-100 mb-4 rounded-3 shadow-sm">
  <img src="${movie.posterUrl}" class="card-img-top img-fluid m-auto" alt="Poster de ${movie.title} ${movie.year != null ? `(${movie.year})` : ""}"/>
      <div class="card-body">
          <h5 class="card-title">${movie.title} (${movie.year})</h5>
          <p class="card-text">
          ${movie.shortDescription}
        </p>
      <a href="pelicula.html?id=${movie.id}" class="btn btn-primary">Ir a pelicula</a>
    </div>
  </div>
</div>`);
}

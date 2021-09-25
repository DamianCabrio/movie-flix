$(document).ready(function () {
  registerForm.submit(singUpUserToIndex);
  loginForm.submit(loginToIndex);

  const divPeliculas = $("#divPeliculas");

  const query = getUrlParameter("query");
  const page = getUrlParameter("page") == false ? 1 : getUrlParameter("page");

  if (query == false) {
    window.location = "index.html";
  }
  let movies = [];
  $.get(searchUrl(query,page), function (response, state) {
    if (state === "success") { 
      let firstLoad = true;
      $('#luckmoshy').luckmoshyPagination({
        totalPages: response.total_pages,
        startPage: response.page,
        visiblePages: 3,
        first: 'Primera',
        prev: 'Anterior',
        next: 'Siguiente',
        last: 'Ultimo',
        onPageClick: function (event, page) {
          if(!firstLoad){
            window.location = `busqueda.html?query=${query}&page=${page}`
          }
          firstLoad = false;
        }
      
      });

        divPeliculas.html("");
        response.results.forEach(function (movie) {
          newMovieObj = new Movie(
            movie.id,
            movie.title,
            movie.release_date !== undefined && movie.release_date.length !== 0 ? movie.release_date : null,
            movie.poster_path,
            movie.overview,
            movie.vote_average
          );
          movies.push(newMovieObj);
          displayMovieCard(newMovieObj,divPeliculas);
        });
    }else{
      window.location = "index.html";
    }
  }).fail(function () {
    window.location = "index.html";
  });
});

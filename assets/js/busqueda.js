$(document).ready(function () {
  const divPeliculas = $("#divPeliculas");

  const query = getUrlParameter("query");
  const page = getUrlParameter("page") == false ? 1 : getUrlParameter("page");

  registerForm.submit(singUpUserToIndex);
  loginForm.submit(loginToIndex);

  //Si no hay búsqueda se vuelve al index
  if (query == false) {
    window.location = "index.html";
  }

  let movies = [];
  $.get(searchUrl(query, page), function (response, state) {
    if (state === "success") {
      //Si la búsqueda con los parámetros datos trame alguna película
      if(response.results.length > 0){
        document.title = query + " | Pagina " + page;
        $("#tituloResultados").text(
          "Resultados de: " + query + " | Pagina " + page
        );
        //Se crea el objeto de paginacion, provisto por la librería luckmoshyPagination
        let firstLoad = true;
        $("#luckmoshy").luckmoshyPagination({
          totalPages: response.total_pages,
          startPage: response.page,
          visiblePages: 3,
          first: "Primera",
          prev: "Anterior",
          next: "Siguiente",
          last: "Ultimo",
          onPageClick: function (event, page) {
            if (!firstLoad) {
              window.location = `busqueda.html?query=${query}&page=${page}`;
            }
            firstLoad = false;
          },
        });
  
        //Con un foreach se muestra cada película que se trajo
        divPeliculas.html("");
        response.results.forEach(function (movie) {
          newMovieObj = new Movie(
            movie.id,
            movie.title,
            movie.release_date !== undefined && movie.release_date.length !== 0
              ? movie.release_date
              : null,
            movie.poster_path,
            movie.overview,
            movie.vote_average
          );
          movies.push(newMovieObj);
          displayMovieCard(newMovieObj, divPeliculas);
        });
      }else{
        //Si no se encuentran películas se muestra un mensaje de error
        document.title = query + " | Pagina " + page;
        $("#tituloResultados").text(
          "Ups, parece que el cine esta vació. Por favor, vuelva a intentar"
        );
        divPeliculas.html("");
        divPeliculas.append("<img class='m-auto img-fluid' src='./assets/img/empty-cinema.jpg'>");
      }
    } else {
      //Si algo falla, se vuelve al index
      window.location = "index.html";
    }
  }).fail(function () {
    window.location = "index.html";
  });
});

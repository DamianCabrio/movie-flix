$(document).ready(function () {
  registerForm.submit(singUpUserToIndex);

  loginForm.submit(loginToIndex);

  $("#goBackButton").click(function () {
    window.history.go(-1);
  });

  const mainMovieDiv = $("#mainMovieDiv");
  const divPeliculasRelacionadas = $("#divPeliculasRelacionadas");
  const trailerDiv = $("#trailer");
  const castDiv = $("#cast");
  const crewDiv = $("#crew");
  const movieBg = $("#movieBg");

  const idMovie = getUrlParameter("id");

  const favoriteButton = $("a.like-button");
  if (localStorage.getItem("loggedInUser") === null) {
    favoriteButton.addClass("d-none");
  } else {
    favoriteButton.on("click", function (e) {
      $(this).toggleClass("liked");
      toggleFavoriteMovie(idMovie)
    });
  }

  if (idMovie !== false) {
    $.get(movieUrl(idMovie), function (response, state) {
      if (state === "success") {
        $(".placeholder").removeClass("placeholder");
        const movieOjb = new Movie(
          idMovie,
          response.title,
          response.release_date !== undefined && response.release_date.length !== 0 ? response.release_date : null,
          response.poster_path,
          response.overview,
          response.vote_average,
          response.budget,
          response.revenue,
          response.vote_count,
          response.genres,
          response.tagline,
          response.backdrop_path,
          response.original_title,
          response.runtime,
          response.videos,
          response.credits.cast,
          response.credits.crew,
          response.similar.results
        );
        document.title = movieOjb.title;

        movieBg.attr("src", movieOjb.backdropImg);
        mainMovieDiv.html("");
        mainMovieDiv.append(`
                <div class="col-3">
                    <img src="${movieOjb.posterUrl}" class="img-fluid" alt="${
          movieOjb.title
        } (${movieOjb.year})">
                </div>
                <div class="col-9 text-justify">
                    <h2>${movieOjb.title} ${
          movieOjb.originalTitle != movieOjb.title
            ? `(${movieOjb.originalTitle})`
            : ""
        }</h2>
                    ${
                      movieOjb.tagline.length > 0
                        ? `<h5>"${movieOjb.tagline}"</h5>`
                        : ""
                    }
                    <p>${movieOjb.description}</p>
                    ${movieOjb.releaseDate != null ? `<p>Fecha de lanzamiento: ${movieOjb.releaseDate}</p>` : "" }
                    ${movieOjb.geners != null ? `<p>Generos: ${movieOjb.geners}</p>` : "" }
                    <p>Presupuesto: ${
                      parseFloat(movieOjb.budget) > 0
                        ? `$${movieOjb.budget}`
                        : "No disponible"
                    } - Recaudación: ${
          parseFloat(movieOjb.revenue) > 0
            ? `$${movieOjb.revenue}`
            : "No disponible"
        }</p>
                    ${
                      parseInt(movieOjb.voteCount) > 0
                        ? `<p>${movieOjb.rating}/10 (${movieOjb.voteCount} votos)</p>`
                        : ""
                    }
                    <p>Duracion: ${
                      parseInt(movieOjb.runtime) > 0
                        ? `${movieOjb.runtime} minutos`
                        : "No disponible"
                    }</p>
                </div>
          `);

        const trailerMovie = movieOjb.getTrailer();

        if (trailerMovie != false) {
          trailerDiv.append(`
          <div id="flush-collapseOne" class="accordion-collapse collapse"
          aria-labelledby="flush-headingOne" data-bs-parent="#movieMultimedia">
            <div class="accordion-body">
                  ${trailerMovie}
              </div>
            </div>
          </div>
          `);
        } else {
          trailerDiv.addClass("d-none");
        }

        const castData = movieOjb.getCast();

        if (castData != false) {
          castDiv.append(`
          <div id="flush-collapseTwo" class="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo" data-bs-parent="#movieMultimedia">
            <div class="accordion-body">
              <table class="table table-striped table-hover table-responsive">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Personaje</th>
                    <th scope="col">Perfil</th>
                  </tr>
                </thead>
                <tbody>
                 ${castData}
                </tbody>
              </table>
            </div>
          </div>
          `);
        } else {
          castDiv.addClass("d-none");
        }

        const crewData = movieOjb.getCrew();

        if (crewData != false) {
          crewDiv.append(`
            <div id="flush-collapseThree" class="accordion-collapse collapse"
                aria-labelledby="flush-headingThree" data-bs-parent="#movieMultimedia">
                <div class="accordion-body">
                  <table class="table table-striped table-hover table-responsive">
                  <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Perfil</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${crewData}
                    </tbody>
                  </table>
                </div>
            </div>
          `);
        } else {
          crewDiv.addClass("d-none");
        }

        divPeliculasRelacionadas.html("");
        if (movieOjb.similar.length > 0) {
          movieOjb.similar.forEach((similarMovie) => {
            newMovieObj = new Movie(
              similarMovie.id,
              similarMovie.title,
              similarMovie.release_date,
              similarMovie.poster_path,
              similarMovie.overview,
              similarMovie.vote_average
            );
            displayMovieCard(newMovieObj, divPeliculasRelacionadas);
          });
        } else {
          divPeliculasRelacionadas.addClass("d-none");
          $("#divPadrePeliculasRelacionadas").addClass("d-none");
        }
      }
    }).fail(function () {
      window.location = "index.html";
    });
  } else {
    window.location = "index.html";
  }
});

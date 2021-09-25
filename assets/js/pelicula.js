$(document).ready(function () {
  registerForm.submit(singUpUserToIndex);

  loginForm.submit(loginToIndex);

  const mainMovieDiv = $("#mainMovieDiv");
  const movieMultimedia = $("#movieMultimedia");
  const movieBg = $("#movieBg");

  const idMovie = getUrlParameter("id");
  if (idMovie !== false) {
    $.get(movieUrl.replace("{movie_id}", idMovie), function (response, state) {
      if (state === "success") {
        const movieOjb = new Movie(
          idMovie,
          response.title,
          response.release_date,
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
        );
        console.log(response);
        movieBg.attr("src", movieOjb.backdropImg);
        mainMovieDiv.html("");
        mainMovieDiv.append(`
                <div class="col-3">
                    <img src="${movieOjb.posterUrl}" class="img-fluid" alt="${movieOjb.title} (${movieOjb.year})">
                </div>
                <div class="col-9 text-justify">
                    <h2>${movieOjb.title} (${movieOjb.originalTitle})</h2>
                    <h5>"${movieOjb.tagline}"</h5>
                    <p>${movieOjb.description}</p>
                    <p>Fecha de lanzamiento: ${movieOjb.releaseDate}</p>
                    <p>Generos: ${movieOjb.geners}</p>
                    <p>Presupuesto: $${movieOjb.budget} - Recaudación: $${movieOjb.revenue}</p>
                    <p>${movieOjb.rating}/10 (${movieOjb.voteCount} votos)</p>
                    <p>Duracion: ${movieOjb.runtime} minutos</p>
                </div>
          `);
        movieMultimedia.html("");
        movieMultimedia.append(`
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false"
                        aria-controls="flush-collapseOne">
                        Videos
                    </button>
                </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne" data-bs-parent="#movieMultimedia">
                  <div class="accordion-body">
                    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel"  data-bs-interval="false">
                      <div class="carousel-inner">
                        ${movieOjb.getMovieVideosDivs()}
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
              </div>
          </div>
          <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                  <button class="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false"
                      aria-controls="flush-collapseTwo">
                      Cast
                  </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo" data-bs-parent="#movieMultimedia">
                  <div class="accordion-body">
                  <table class="table table-striped table-hover">
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
                      ${movieOjb.getCast()}
                      </tbody>
                    </table>
                  </div>
              </div>
          </div>
          <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                  <button class="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false"
                      aria-controls="flush-collapseThree">
                      Crew
                  </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree" data-bs-parent="#movieMultimedia">
                  <div class="accordion-body">
                    <table class="table table-striped table-hover">
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
                      ${movieOjb.getCrew()}
                      </tbody>
                    </table>
                  </div>
              </div>
          </div>
        `);
      }
    });
  } else {
    window.location = "index.html";
  }
});

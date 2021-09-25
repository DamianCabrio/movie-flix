$(document).ready(function () {
  const successLoginAlert = $("#successLoginAlert");
  const errorAlert = $('#errorLoginAlert');
  const divPeliculas = $("#divPeliculas");


  registerForm.submit(singUpUserIndex);

  loginForm.submit(loginIndex);

  let movies = [];

  $.get(popularMoviesUrl, function (response, state) {
    if (state === "success") {
      divPeliculas.html("");
      response.results.forEach(function (movie) {
        newMovieObj = new Movie(
          movie.id,
          movie.title,
          movie.release_date,
          movie.poster_path,
          movie.overview,
          movie.vote_average
        );
        movies.push(newMovieObj);
        displayMovieCard(newMovieObj);
      });
    }else{
      showAlert(errorAlert, "Error: No se pudo obtener la información de las películas, por favor, vuelva a intentar luego");
    }
  });
  function singUpUserIndex(e) {
    wasUserSignup = signUpUser(e);

    if (wasUserSignup !== false) {
      showAlert(successLoginAlert, "Su cuenta se registro con éxito", 5000);
      createWelcomeMessage(true);
    }
  }

  function loginIndex(e) {
    wasLogedIn = login(e);

    if (wasLogedIn !== false) {
      showAlert(successLoginAlert, "Se inicio la sesión con éxito", 5000);
      createWelcomeMessage(false);
    }
  }

  function displayMovieCard(movie) {
    divPeliculas.append(`<div class="col">
  <div class="card h-100 mb-4 rounded-3 shadow-sm">
    <img src="${movie.posterUrl}" class="card-img-top img-fluid m-auto" alt="Poster de ${movie.title} (${movie.year})"/>
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

  //Luego de logearse o registrarse, personaliza el index con datos del usuario, y quita los botones de iniciar sesión y registro, y muestra el de cerrar sesión
  function createWelcomeMessage(isFistTime) {
    const user = getUsersObj().find(
      (u) => u.id === parseInt(localStorage.getItem("loggedInUser"))
    );

    const hero = $("#hero");
    const title = $("#mainTitle");

    hero.append(
      "<p>" + isFistTime
        ? `¡Bienvenido ${user.name} ${user.surname}!`
        : `¡Bienvenido de nuevo ${user.name} ${user.surname}!` + "</p>"
    );

    title.text(title.text() + ` de ${user.username}`);
  }

    //Si el usuario ya estaba logeado se inicia sesión automáticamente
    if (localStorage.getItem("loggedInUser") !== null) {
      createWelcomeMessage(false);
    }
});
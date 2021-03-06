$(document).ready(function () {
  const successLoginAlert = $("#successLoginAlert");
  const errorAlert = $("#errorLoginAlert");
  const divPeliculas = $("#divPeliculas");

  registerForm.submit(singUpUserIndex);

  loginForm.submit(loginIndex);

  let movies = [];

  $.get(popularMoviesUrl, function (response, state) {
    //Si se trae los datos con exito, con un foreach se crea un objeto película y se lo muestra en un card
    if (state === "success") {
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
    } else {
      //Clausulas de error, si los datos no pueden traerse
      showAlert(
        errorAlert,
        "Error: No se pudo obtener la información de las películas, por favor, vuelva a intentar luego"
      );
    }
  }).fail(function () {
    showAlert(
      errorAlert,
      "Error: No se pudo obtener la información de las películas, por favor, vuelva a intentar luego"
    );
  });

  //Función de registro
  function singUpUserIndex(e) {
    wasUserSignup = signUpUser(e);

    if (wasUserSignup !== false) {
      showAlert(successLoginAlert, "Su cuenta se registro con éxito", 5000);
      createWelcomeMessage(true);
    }
  }

  //Función de inicio de sesión
  function loginIndex(e) {
    wasLogedIn = login(e);

    if (wasLogedIn !== false) {
      showAlert(successLoginAlert, "Se inicio la sesión con éxito", 5000);
      createWelcomeMessage(false);
    }
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

  //Si el usuario ya estaba logeado se personaliza el banner en el inicio
  if (localStorage.getItem("loggedInUser") !== null) {
    createWelcomeMessage(false);
  }
});

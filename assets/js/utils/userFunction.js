//Se obtienen los elementos para poder operar, y se agregan eventos a algunos de ellos
const registerModal = $("#modalRegister").get(0);
const registerForm = $("#registerForm");

const loginModal = $("#modalLogIn").get(0);
const loginForm = $("#loginForm");

const errorAlertRegister = $("#errorAlertRegister");
const errorAlertLogin = $("#errorAlertLogin");

const loginButton = $("#logInButton");
const registerButton = $("#registerButton");
const logOutButton = $("#logOutButton");
logOutButton.click(logOut);

//Obtiene el objeto de usuarios de local storage
function getUsersObj() {
  return JSON.parse(localStorage.getItem("users"));
}

//Función para iniciar sesión, obtiene los datos del formulario, y hace verificaciones necesarias (username único y restricciones de contraseña)
function signUpUser(e) {
  e.preventDefault();

  const name = $("#nameRegister").val();
  const surname = $("#surnameRegister").val();
  const username = $("#userRegister").val();
  const password = $("#passwordRegister").val();
  const confirmedPassword = $("#confirmPasswordRegister").val();

  if (!name || !surname || !username || !password || !confirmedPassword) {
    return false;
  }

  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  if (getUsersObj().find((e) => e.username === username) !== undefined) {
    showAlert(errorAlertRegister, "El nombre de usuario elegido ya existe");
    return false;
  }

  if (password != confirmedPassword) {
    showAlert(errorAlertRegister, "Las contraseñas ingresadas son distintas");
    return false;
  } else if (password.length < 8) {
    showAlert(
      errorAlertRegister,
      "La contraseña debe tener por lo menos 8 caracteres"
    );
    return false;
  }

  hideAlert(errorAlertRegister);

  newUser = new User(calculateUserId(), name, surname, username, password);

  const usersObj = JSON.parse(localStorage.getItem("users"));
  usersObj.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersObj));

  localStorage.setItem("loggedInUser", newUser.id);

  bootstrap.Modal.getInstance(registerModal).hide();
  registerForm.trigger("reset");
  removeLoginButtons();
  return newUser;
}

//Función para iniciar sesión, verifica si existe el usuario
function login(e) {
  e.preventDefault();

  if (localStorage.getItem("users") === null) {
    showAlert(
      errorAlertLogin,
      "La contraseña o nombre de usuario son erróneos"
    );
    return false;
  } else {
    hideAlert(errorAlertLogin);
  }

  const username = $("#userLogin").val().toLowerCase();
  const password = $("#passwordLogin").val();

  if (!username || !password) {
    return false;
  }

  user = getUsersObj().find(
    (user) => user.username === username && user.password === password
  );

  if (user == undefined) {
    showAlert(
      errorAlertLogin,
      "La contraseña o nombre de usuario son erróneos"
    );
    return false;
  }
  hideAlert(errorAlertLogin);

  localStorage.setItem("loggedInUser", user.id);

  bootstrap.Modal.getInstance(loginModal).hide();
  loginForm.trigger("reset");
  removeLoginButtons();
  return user;
}

function singUpUserToIndex(e) {
  wasUserSignup = signUpUser(e);

  if (wasUserSignup !== false) {
    window.location = "index.html";
  }
}

function loginToIndex(e) {
  const wasLogin = login(e);
  if (wasLogin !== false) {
    window.location = "index.html";
  }
}

function addFavoriteMovie(id) {
  const idLoggedInUser = localStorage.getItem("loggedInUser");

  let arrayFavoriteMovies = [];
  if (localStorage.getItem("favoriteMovies") !== null) {
    arrayFavoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
  }

  let arrayFavoriteMoviesUser = arrayFavoriteMovies.find(
    (e) => e.iduser === idLoggedInUser
  );

  if (arrayFavoriteMoviesUser === undefined) {
    arrayFavoriteMoviesUser = { iduser: idLoggedInUser, movies: [id] };
    arrayFavoriteMovies.push(arrayFavoriteMoviesUser);
  } else {
    arrayFavoriteMoviesUser.movies.push(id);
    arrayFavoriteMovies.map((e) =>
      e.iduser == idLoggedInUser ? arrayFavoriteMoviesUser : e
    );
  }

  localStorage.setItem("favoriteMovies", JSON.stringify(arrayFavoriteMovies));
}

function removeFavoriteMovie(id) {
  const idLoggedInUser = localStorage.getItem("loggedInUser");
  let arrayFavoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));

  let arrayFavoriteMoviesUser = arrayFavoriteMovies.find(
    (e) => e.iduser === idLoggedInUser
  );

  const index = arrayFavoriteMoviesUser.movies.indexOf(id);
  arrayFavoriteMoviesUser.movies.splice(index, 1);

  arrayFavoriteMovies.map((e) =>
    e.iduser == idLoggedInUser ? arrayFavoriteMoviesUser : e
  );
  localStorage.setItem("favoriteMovies", JSON.stringify(arrayFavoriteMovies));
}

function hasFavoriteMovie(id) {
  const idLoggedInUser = localStorage.getItem("loggedInUser");
  const arrayFavoriteMovies = JSON.parse(
    localStorage.getItem("favoriteMovies")
  );

  if (arrayFavoriteMovies !== null) {
    const arrayFavoriteMoviesUser = arrayFavoriteMovies.find(
      (e) => e.iduser === idLoggedInUser
    );
    if (arrayFavoriteMoviesUser !== undefined) {
      return arrayFavoriteMoviesUser.movies.includes(id);
    }

    return false;
  }
  return false
}

//Cierra sesión eliminando el id del usuario logeado actual, y recarga la pagina
function logOut() {
  localStorage.removeItem("loggedInUser");
  window.location = "index.html";
}

//Busca cual fue el ultimo id utilizado en usuarios y devuelve el siguiente id a usar
function calculateUserId() {
  const users = getUsersObj();
  return users.length === 0 ? 0 : users[users.length - 1].id + 1;
}

function removeLoginButtons() {
  loginButton.addClass("d-none");
  registerButton.addClass("d-none");

  logOutButton.removeClass("d-none");

  loggedUser = getUsersObj().find(
    (e) => (e.id = localStorage.getItem("loggedInUser"))
  );
  $("#logOutButton a").text("Cerrar Sesión (" + loggedUser.username + ")");
}

//Si el usuario ya estaba logeado se inicia sesión automáticamente
if (localStorage.getItem("loggedInUser") !== null) {
  removeLoginButtons();
}

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

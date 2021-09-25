//Clases de usuarios y peliculas
class User {
  constructor(id, name, surname, username, password) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.username = username.toLowerCase();
    this.password = password;
  }
}

class Movie {
  constructor(title, year, director, img, description) {
    this.title = title;
    this.year = year;
    this.director = director;
    this.img = img;
    this.description = description;
  }
}

//Por ahora creo objetos de películas para mostrar aca, luego se traerán películas populares de una api
const pelicula1 = new Movie(
  "Volver al futuro",
  1985,
  "Robert Zemeckis",
  "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  "Marty McFly, un estudiante de secundaria de 17 años, es enviado accidentalmente treinta años al pasado en un DeLorean que viaja en el tiempo, inventado por su gran amigo, el excéntrico científico Doc Brown."
);
const pelicula2 = new Movie(
  "El imperio contraataca",
  1980,
  "Irvin Kershner",
  "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  "Después de que los Rebeldes sean brutalmente dominados por el Imperio en el planeta helado Hoth, Luke Skywalker comienza el entrenamiento Jedi con Yoda, mientras sus amigos son perseguidos por toda la galaxia por Darth Vader y el cazarrecompensas Boba Fett."
);

const pelicula3 = new Movie(
  "Gladiador",
  2000,
  "Ridley Scott",
  "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  "Un antiguo general romano se propone vengarse del emperador corrupto que asesinó a su familia y lo envió a la esclavitud."
);

const pelicula4 = new Movie(
  "Matrix",
  1999,
  "Lana Wachowski, Lilly Wachowski",
  "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  "Cuando una bella desconocida conduce al hacker informático Neo a un submundo prohibitivo, éste descubre la impactante verdad: la vida que conoce es el elaborado engaño de una malvada ciberinteligencia."
);

const peliculas = [pelicula1, pelicula2, pelicula3, pelicula4];
const divPeliculas = $('#divPeliculas')
//Se crean las cards de películas para mostrar en el index
peliculas.forEach((pelicula) => {
  divPeliculas.append(`<div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm">
                          <div class="card">
                            <img src="${pelicula.img}" class="card-img-top img-fluid m-auto" alt="${pelicula.title}"/>
                                <div class="card-body">
                                    <h5 class="card-title">${pelicula.title} (${pelicula.year}) - ${pelicula.director}</h5>
                                    <p class="card-text">
                                    ${pelicula.description}
                                  </p>
                                <a href="#" class="btn btn-primary">Ir a pelicula</a>
                              </div>
                            </div>
                          </div>
                        </div>`
                      );
});

//Se obtienen los elementos para poder operar, y se agregan eventos a algunos de ellos
const registerModal = $('#modalRegister').get(0);
const registerForm = $('#registerForm');
registerForm.submit(signUpUser)

const loginModal = $('#modalLogIn').get(0);
const loginForm = $('#loginForm');
loginForm.submit(login)

const errorAlertRegister = $('#errorAlertRegister');
const errorAlertLogin = $('#errorAlertLogin');
const successLoginAlert = $('#successLoginAlert');

const loginButton = $('#logInButton');
const registerButton = $('#registerButton');
const logOutButton = $('#logOutButton');
logOutButton.click(logOut);

//Obtiene el objeto de usuarios de local storage
function getUsersObj() {
  return JSON.parse(localStorage.getItem("users"));
}

//Función para iniciar sesión, obtiene los datos del formulario, y hace verificaciones necesarias (username único y restricciones de contraseña)
function signUpUser(e) {
  e.preventDefault();

  const name = $('#nameRegister').val();
  const surname = $('#surnameRegister').val();
  const username = $('#userRegister').val();
  const password = $('#passwordRegister').val();
  const confirmedPassword = $('#confirmPasswordRegister').val();

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
  
  hideErrorAlert(errorAlertRegister);

  newUser = new User(calculateUserId(), name, surname, username, password);

  const usersObj = JSON.parse(localStorage.getItem("users"));
  usersObj.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersObj));

  localStorage.setItem("loggedInUser", newUser.id);

  showAlert(successLoginAlert, "Su cuenta se registro con éxito", 5000);
  createWelcomeMessage(true);
  bootstrap.Modal.getInstance(registerModal).hide();
  registerForm.trigger("reset");
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
    hideErrorAlert(errorAlertLogin);
  }

  const username = $('#userLogin').val().toLowerCase();
  const password = $('#passwordLogin').val();

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
  hideErrorAlert(errorAlertLogin);

  localStorage.setItem("loggedInUser", user.id);

  showAlert(successLoginAlert, "Se inicio la sesión con éxito", 5000);
  createWelcomeMessage(false);
  bootstrap.Modal.getInstance(loginModal).hide();
  loginForm.trigger("reset");

  return user;
}

//Cierra sesión eliminando el id del usuario logeado actual, y recarga la pagina
function logOut() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}

function showAlert(alert, message, timer = null) {
  alert.removeClass("d-none");
  alert.html(message);

  if (timer != null) {
    setTimeout(function() {hideErrorAlert(alert)}, timer);
  }
}

function hideErrorAlert(alert) {
  alert.addClass("d-none");
}

//Luego de logearse o registrarse, personaliza el index con datos del usuario, y quita los botones de iniciar sesión y registro, y muestra el de cerrar sesión
function createWelcomeMessage(isFistTime) {
  loginButton.addClass('d-none');
  registerButton.addClass('d-none');

  logOutButton.removeClass("d-none");

  const user = getUsersObj().find(
    (u) => u.id === parseInt(localStorage.getItem("loggedInUser"))
  );
  
  const hero = $('#hero');
  const title = $('#mainTitle');

  hero.append("<p>"+ 
  isFistTime
    ? `¡Bienvenido ${user.name} ${user.surname}!`
    : `¡Bienvenido de nuevo ${user.name} ${user.surname}!`
  +"</p>");

  title.text(title.text() + ` de ${user.username}`);
}

//Busca cual fue el ultimo id utilizado en usuarios y devuelve el siguiente id a usar
function calculateUserId() {
  const users = getUsersObj();
  return users.length === 0 ? 0 : users[users.length - 1].id + 1;
}

$(document).ready(function() {
//Si el usuario ya estaba logeado se inicia sesión automáticamente
if (localStorage.getItem("loggedInUser") !== null) {
  createWelcomeMessage(false);
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

});
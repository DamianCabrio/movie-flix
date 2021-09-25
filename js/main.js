//Entidades

//Variables (constantes, selectores, arrays)

//Funciones

//Eventos

//Logica

//Clases
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
const divPeliculas = document.getElementById("divPeliculas");
//Se crean las cards de películas para mostrar en el index
peliculas.forEach((pelicula) => {
  const contenedor = document.createElement("div");
  contenedor.classList.add("col");

  contenedor.innerHTML = `<div class="card mb-4 rounded-3 shadow-sm">
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
                            </div>`;
  divPeliculas.appendChild(contenedor);
});

//Se obtienen los elementos para poder operar, y se agregan eventos a algunos de ellos
const registerModal = document.getElementById("modalRegister");
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", signUpUser);

const loginModal = document.getElementById("modalLogIn");
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", login);

const errorAlertRegister = document.getElementById("errorAlertRegister");
const errorAlertLogin = document.getElementById("errorAlertLogin");
const successLoginAlert = document.getElementById("successLoginAlert");

const loginButton = document.getElementById("logInButton");
const registerButton = document.getElementById("registerButton");
const logOutButton = document.getElementById("logOutButton");
logOutButton.addEventListener("click", logOut);

//Obtiene el objeto de usuarios de local storage
function getUsersObj() {
  return JSON.parse(localStorage.getItem("users"));
}

//Función para iniciar sesión, obtiene los datos del formulario, y hace verificaciones necesarias (username único y restricciones de contraseña)
function signUpUser(e) {
  e.preventDefault();

  const name = document.getElementById("nameRegister").value;
  const surname = document.getElementById("surnameRegister").value;
  const username = document.getElementById("userRegister").value;
  const password = document.getElementById("passwordRegister").value;
  const confirmedPassword = document.getElementById(
    "confirmPasswordRegister"
  ).value;

  if (!name || !surname || !username || !password || !confirmedPassword) {
    return false;
  }

  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  if (getUsersObj().find((e) => e.username === username) !== undefined) {
    showAlert(errorAlertRegister, "El nombre de usuario elegido ya existe");
    return false;
  } else {
    hideErrorAlert(errorAlertRegister);
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
  } else {
    hideErrorAlert(errorAlertRegister);
  }

  newUser = new User(calculateUserId(), name, surname, username, password);

  const usersObj = JSON.parse(localStorage.getItem("users"));
  usersObj.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersObj));

  localStorage.setItem("loggedInUser", newUser.id);

  showAlert(successLoginAlert, "Su cuenta se registro con éxito", 5000);
  createWelcomeMessage(true);
  bootstrap.Modal.getInstance(registerModal).hide();
  registerForm.reset();
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

  const username = document.getElementById("userLogin").value.toLowerCase();
  const password = document.getElementById("passwordLogin").value;

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
  } else {
    hideErrorAlert(errorAlertLogin);
  }

  localStorage.setItem("loggedInUser", user.id);

  showAlert(successLoginAlert, "Se inicio la sesión con éxito", 5000);
  createWelcomeMessage(false);
  bootstrap.Modal.getInstance(loginModal).hide();
  loginForm.reset();

  return user;
}

//Cierra sesión eliminando el id del usuario logeado actual, y recarga la pagina
function logOut() {
  localStorage.removeItem("loggedInUser");
  window.location.reload();
}

function showAlert(alert, message, timer = null) {
  alert.classList.remove("d-none");
  alert.innerHTML = message;

  if (timer != null) {
    setTimeout(function() {hideErrorAlert(alert)}, timer);
  }
}

function hideErrorAlert(alert) {
  alert.classList.add("d-none");
}

//Luego de logearse o registrarse, personaliza el index con datos del usuario, y quita los botones de iniciar sesión y registro, y muestra el de cerrar sesión
function createWelcomeMessage(isFistTime) {
  registerButton.classList.add("d-none");
  loginButton.classList.add("d-none");
  logOutButton.classList.remove("d-none");

  const user = getUsersObj().find(
    (u) => u.id === parseInt(localStorage.getItem("loggedInUser"))
  );
  const hero = document.getElementById("hero");
  const title = document.getElementById("mainTitle");

  const p = document.createElement("p");
  p.innerHTML = isFistTime
    ? `¡Bienvenido ${user.name} ${user.surname}!`
    : `¡Bienvenido de nuevo ${user.name} ${user.surname}!`;
  hero.appendChild(p);

  title.textContent += ` de ${user.username}`;
}

//Busca cual fue el ultimo id utilizado en usuarios y devuelve el siguiente id a usar
function calculateUserId() {
  const users = getUsersObj();
  return users.length === 0 ? 0 : users[users.length - 1].id + 1;
}

//Si el usuario ya estaba logeado se inicia sesión automáticamente
if (localStorage.getItem("loggedInUser") !== null) {
  createWelcomeMessage(false);
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
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

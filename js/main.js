class User {
  constructor(name, surname, username, password) {
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

function getUsersObj() {
  return JSON.parse(localStorage.getItem("users"));
}

function signUpUser() {
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  const name = prompt("Ingrese su nombre");
  const surname = prompt("Ingrese su apellido");
  const username = prompt("Ingrese su nombre de usuario");
  const password = prompt("Ingrese su contraseña");
  newUser = new User(name, surname, username, password);

  const usersObj = JSON.parse(localStorage.getItem("users"));
  usersObj.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersObj));

  return newUser;
}

function login() {
  if (localStorage.getItem("users") === null) {
    return false;
  }

  const username = prompt("Ingrese su nombre de usuario").toLocaleLowerCase();
  const password = prompt("Ingrese su contraseña");

  const usersObj = getUsersObj();
  user = usersObj.find(
    (user) => user.username === username && user.password === password
  );

  if (user == undefined) {
    return false;
  }

  return user;
}

function createWelcomeMessage(isFistTime, user) {
  const hero = document.getElementById("hero");
  const title = document.getElementById("mainTitle");

  const p = document.createElement("p");
  p.innerHTML = isFistTime
    ? `¡Bienvenido ${user.name} ${user.surname}!`
    : `¡Bienvenido de nuevo ${user.name} ${user.surname}!`;
  hero.appendChild(p);

  title.textContent += ` de ${user.username}`;
}

const accountOption = parseInt(
  prompt(
    "Bienvenido a MovieFlix.\nIngrese 1 para iniciar sesión, 2 para registrase"
  )
);

switch (accountOption) {
  case 1:
    const userLogin = login();
    if (userLogin != false) {
      createWelcomeMessage(false, userLogin);
      alert("Se inicio session con éxito");
    } else {
      alert("Usuario no encontrado");
    }
    break;
  case 2:
    const userSignUp = signUpUser();
    if (userSignUp != false) {
      createWelcomeMessage(true, userSignUp);
      alert("El registro se realizo con éxito");
    }
    break;
  default:
    alert("Opción no soportada");
}

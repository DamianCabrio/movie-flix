class User {
    constructor(name,surname,username, password){
        this.name = name;
        this.surname = surname;
        this.username = username.toLowerCase();
        this.password = password;
    }
}

function getUsersObj() {
    return JSON.parse(localStorage.getItem("users"));
}


function signUpUser() {
    if(localStorage.getItem("users") === null){
        localStorage.setItem("users", JSON.stringify([]));
    }

    const name = prompt("Ingrese su nombre");
    const surname = prompt("Ingrese su apellido");
    const username = prompt("Ingrese su nombre de usuario");
    const password = prompt("Ingrese su contraseña");
    newUser = new User(name,surname,username,password);

    const usersObj = JSON.parse(localStorage.getItem("users"));
    usersObj.push(newUser);
    localStorage.setItem("users",JSON.stringify(usersObj));

    return newUser;
}

function login(){
    if(localStorage.getItem("users") === null){
        return false;
    }

    const username = prompt("Ingrese su nombre de usuario").toLocaleLowerCase();
    const password = prompt("Ingrese su contraseña");

    const usersObj = getUsersObj();
    user = usersObj.find(user => user.username === username && user.password === password);

    if(user == undefined){
        return false;
    }

    return user;
}

function createWelcomeMessage(isFistTime, user){
    const hero = document.getElementById("hero");
    const title = document.getElementById("mainTitle");

    const p = document.createElement("p");
    p.innerHTML = isFistTime ? `¡Bienvenido ${user.name} ${user.surname}!` : `¡Bienvenido de nuevo ${user.name} ${user.surname}!`;
    hero.appendChild(p);

    title.textContent += ` de ${user.username}`;
}

const accountOption = parseInt(prompt("Bienvenido a MovieFlix.\nIngrese 1 para iniciar sesión, 2 para registrase"));

switch (accountOption) {
    case 1:
        const userLogin = login();
        if(userLogin != false){
            createWelcomeMessage(false,userLogin);
            alert("Se inicio session con éxito");
        }else{
            alert("Usuario no encontrado");
        }
        break;
    case 2:
        const userSignUp = signUpUser();
        if(userSignUp != false){
            createWelcomeMessage(true,userSignUp);
            alert("El registro se realizo con éxito")
        }
        break;
    default:
        alert("Opción no soportada")
}
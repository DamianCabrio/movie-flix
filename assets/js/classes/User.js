class User {
  constructor(id, name, surname, username, password) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.username = username.toLowerCase();
    this.password = password;
  }
}

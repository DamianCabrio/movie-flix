class Person {
  constructor(
    id,
    name,
    birthday,
    deathday,
    gender,
    department,
    biography,
    placeBirth,
    img,
    credits = []
  ) {
    this.id = id;
    this.name = name;
    this.birthday =
      birthday != null
        ? new Date(birthday).toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : null;
    this.deathday =
      deathday != null
        ? new Date(deathday).toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : null;
    this.gender =
      gender == 1 ? "Femenino" : gender == 2 ? "Masculino" : "No definido";
    this.department = department;
    this.biography = biography;
    this.placeBirth = placeBirth;
    this.img =
      img != null
        ? "https://image.tmdb.org/t/p/w500" + img
        : "/assets/img/default-pic.jpg";
    this.credits = credits;
  }

  getCredits() {
    if (this.credits !== []) {
      let creditRows = "";
      let cantCreditos = 0;

      Object.keys(this.credits).forEach((key) => {
        this.credits[key].forEach((credit, j) => {
          cantCreditos++;
          const movieImg =
            credit.poster_path != null
              ? `<img style="width: 50px" src="${
                  "https://image.tmdb.org/t/p/w500" + credit.poster_path
                }">`
              : '<img style="width: 50px" src="/assets/img/default-pic-movie.png">';
          creditRows += ` 
                <tr>
                <th scope="row">${cantCreditos}</th>
                <td>${movieImg}</td>
                <td>${credit.title}</td>
                <td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td>${
                  key == "crew"
                    ? credit.department
                    : credit.character == "" || credit.character == null
                    ? "No disponible"
                    : credit.character
                }</td>
                <td>${
                  credit.release_date != null
                    ? new Date(credit.release_date).toLocaleDateString("es-Ar")
                    : "-"
                }</td>
                <td><a class="btn btn-primary" href="/pelicula.html?id=${
                  credit.id
                }">Mas info</a></td>
              </tr>
              `;
        });
      });
      return creditRows;
    }
    return false;
  }
}

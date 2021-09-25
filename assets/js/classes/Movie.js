class Movie {
  constructor(
    id,
    title,
    releaseDate,
    posterUrl,
    description,
    rating,
    budget = 0,
    revenue = 0,
    voteCount = 0,
    geners = [],
    tagline = null,
    backdropImg = null,
    originalTitle = null,
    runtime = null,
    videos = [],
    cast = [],
    crew = [],
    similar = []
  ) {
    this.id = id;
    this.title = title;
    this.releaseDate =
      releaseDate != null
        ? new Date(releaseDate).toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : null;
    this.year = releaseDate != null ? releaseDate.substr(0, 4) : "Desconocido";
    this.posterUrl =
      posterUrl != null
        ? "https://image.tmdb.org/t/p/w500" + posterUrl
        : "./assets/img/default-pic-movie.png";
    this.description = description;
    this.budget = budget.toLocaleString("es-AR");
    this.revenue = revenue.toLocaleString("es-AR");
    this.voteCount = voteCount;
    this.videos = videos.results;
    this.geners =
      geners.length > 0
        ? geners
            .map(function (genre) {
              if (genre != "") {
                return genre.name;
              }
            })
            .join(", ")
        : null;
    this.tagline = tagline;
    this.originalTitle = originalTitle;
    this.runtime = runtime;
    this.cast = cast;
    this.crew = crew;
    this.backdropImg =
      backdropImg != null
        ? "https://image.tmdb.org/t/p/original" + backdropImg
        : null;
    this.shortDescription =
      this.description.length !== 0
        ? this.description.replace(/^(.{250}[^\s]*).*/, "$1") + "..."
        : "Descripcion no disponible";
    this.rating = rating;
    this.similar = similar;
  }

  //Devuelve el trailer de una película, si este existe
  getTrailer() {
    if (this.videos !== [] && this.videos.length > 0) {
      let trailer = `
      <div class="youtube-video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${this.videos[0].key}?enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div> `;
      return trailer;
    }
    return false;
  }

  //Devuelve el cast de una película, si este existe
  getCast() {
    if (this.cast !== [] && this.cast.length > 0) {
      let castRows = "";
      this.cast.forEach((person, i) => {
        const personImg =
          person.profile_path != null
            ? `<img style="width: 50px" src="${
                "https://image.tmdb.org/t/p/w500" + person.profile_path
              }">`
            : '<img style="width: 50px" src="./assets/img/default-pic.jpg">';
        castRows += ` 
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${personImg}</td>
        <td>${person.name == null || person.name == "" ? "-" : person.name}</td>
        <td>${
          person.character == null || person.character == ""
            ? "-"
            : person.character
        }</td>
        <td><a class="btn btn-primary" href="persona.html?id=${
          person.id
        }">Perfil</a></td>
      </tr>
      `;
      });
      return castRows;
    }
    return false;
  }

  //Devuelve el crew de una película, si este existe
  getCrew() {
    if (this.crew !== [] && this.crew.length > 0) {
      let crewRows = "";
      this.crew.forEach((person, i) => {
        const personImg =
          person.profile_path != null
            ? `<img style="width: 50px" src="${
                "https://image.tmdb.org/t/p/w500" + person.profile_path
              }">`
            : '<img style="width: 50px" src="./assets/img/default-pic.jpg">';
        crewRows += ` 
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${personImg}</td>
        <td>${person.name == null || person.name == "" ? "-" : person.name}</td>
        <td>${
          person.department == null || person.department == ""
            ? "-"
            : person.department
        }</td>
        <td><a class="btn btn-primary" href="persona.html?id=${
          person.id
        }">Perfil</a></td>
      </tr>
      `;
      });
      return crewRows;
    }
    return false;
  }
}

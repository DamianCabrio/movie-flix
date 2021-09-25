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
    crew = []
  ) {
    this.id = id;
    this.title = title;
    this.releaseDate = new Date(releaseDate).toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    this.year = releaseDate.substr(0, 4);
    this.posterUrl = "https://image.tmdb.org/t/p/w500" + posterUrl;
    this.description = description;
    this.budget = budget.toLocaleString("es-AR");
    this.revenue = revenue.toLocaleString("es-AR");
    this.voteCount = voteCount;
    this.videos = videos.results;
    this.geners = geners
      .map(function (genre) {
        return genre.name;
      })
      .join(", ");
    this.tagline = tagline;
    this.originalTitle = originalTitle;
    this.runtime = runtime;
    this.cast = cast;
    this.crew = crew;
    this.backdropImg = "https://image.tmdb.org/t/p/original" + backdropImg;
    this.shortDescription =
      this.description.length !== 0
        ? this.description.replace(/^(.{250}[^\s]*).*/, "$1") + "..."
        : "Descripcion no disponible";
    this.rating = rating;
  }

  getMovieVideosDivs() {
    if (this.videos !== [] && this.videos.length > 0) {
      let videosDivs = "";
      this.videos.forEach((movie, i) => {
        videosDivs += ` <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="youtube-video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${
          movie.key
        }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
      </div> `;
      });
      return videosDivs;
    }
  }

  getCast() {
    if (this.cast !== [] && this.cast.length > 0) {
      let castRows = "";
      this.cast.forEach((person, i) => {
        const personImg =
          person.profile_path != null
            ? `<img style="width: 50px" src="${
                "https://image.tmdb.org/t/p/w500" + person.profile_path
              }">`
            : "No disponible";
        castRows += ` 
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${personImg}</td>
        <td>${person.character}</td>
        <td>${person.name}</td>
        <td><a class="btn btn-primary">Perfil</a></td>
      </tr>
      `;
      });
      return castRows;
    }
  }

  getCrew() {
    if (this.crew !== [] && this.crew.length > 0) {
      let crewRows = "";
      this.crew.forEach((person, i) => {
        const personImg =
          person.profile_path != null
            ? `<img style="width: 50px" src="${
                "https://image.tmdb.org/t/p/w500" + person.profile_path
              }">`
            : "No disponible";
        crewRows += ` 
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${personImg}</td>
        <td>${person.name}</td>
        <td>${person.department}</td>
        <td><a class="btn btn-primary">Perfil</a></td>
      </tr>
      `;
      });
      return crewRows;
    }
  }
}

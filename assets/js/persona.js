$(document).ready(function () {
  registerForm.submit(singUpUserToIndex);

  loginForm.submit(loginToIndex);

  $("#goBackButton").click(function () {
    window.history.go(-1);
  });

  const mainPersonDiv = $("#mainPersonDiv");
  const creditsDiv = $("#creditosDiv");

  const idPersona = getUrlParameter("id");
  if (idPersona !== false) {
    $.get(personUrl(idPersona), function (response, state) {
      if (state === "success") {
        $(".placeholder").removeClass("placeholder");
        const personObj = new Person(
          idPersona,
          response.name,
          response.birthday,
          response.deathday,
          response.gender,
          response.known_for_department,
          response.biography,
          response.place_of_birth,
          response.profile_path,
          response.movie_credits
        );

        document.title = personObj.name;

        mainPersonDiv.html("");
        mainPersonDiv.append(`
          <div class="col-12 col-md-3">
              <img src="${personObj.img}" class="img-fluid" alt="${
          personObj.name
        }">
          </div>
          <div class="col-9 text-justify">
              <h2>${personObj.name}</h2>
              <p>${personObj.biography}</p>
              ${
                personObj.birthday != null
                  ? `<p>Fecha de nacimiento: ${personObj.birthday}</p>`
                  : ""
              }
              ${
                personObj.deathday != null
                  ? `<p>Fecha de muerte: ${personObj.deathday}</p>`
                  : ""
              }
              <p>Genero: ${personObj.gender}</p>
              <p>Conocido/a por: ${personObj.department}</p>
              ${
                personObj.placeBirth != null
                  ? `<p>Lugar de nacimiento: ${personObj.placeBirth}</p>`
                  : ""
              }
          </div>
    `);

        creditsData = personObj.getCredits();

        if (creditsData != false) {
          creditsDiv.append(`
          <div id="flush-collapseOne" class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne" data-bs-parent="#creditsParent">
              <div class="accordion-body table-responsive">
                <table class="table table-striped table-hover">
                <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Imagen</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Personaje/Departamento</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Ver</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${creditsData}
                  </tbody>
                </table>
              </div>
          </div>
        `);
        } else {
          creditsDiv.addClass("d-none");
        }
      }
    }).fail(function () {
      window.location = "index.html";
    });
  } else {
    window.location = "index.html";
  }
});

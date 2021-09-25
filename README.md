## MovieFlix

MovieFlix es un proyecto realizado por Damián Cabrio, para el curso de JavaScript, dictado en CoderHouse.
El sitio utiliza la API de TMDB (The movie database), la cual es gratis, abierta.
Las funcionalidades del sitio son:

1. Index con las películas más populares en Argentina (calculado por la API de TMDB).

![index](https://i.imgur.com/W8GmBZr.png)

2. Registro e inicio de sesión desde cualquiera de las páginas del sitio, con verificaciones. El sitio recuerda la cuenta que inicio sesión al volverse a abrir luego de cerrarse.

![Inicio de sesión](https://i.imgur.com/helHjXH.png)![Registro](https://i.imgur.com/y4fuZoB.png)

3. Vista particular de una película, con información sobre ella (título, póster, fecha de estreno, recaudación, descripción, tráiler, cast y crew, entre otras), además de mostrar películas relacionadas debajo. Si hay un usuario registrado viendo esta vista, se va a habilitar un botón de "Agregar a favorito", que va a recordar que películas se agregaron a favoritos de forma independiente a cada cuenta.

![Vista de película](https://i.imgur.com/kbot5cA.png)

4. Vista particular de una persona (cast o crew) con información sobre esta, como fecha de nacimiento, descripción, foto, créditos, etc.

![Vista de persona](https://i.imgur.com/yfsJk5g.png) 

5. Búsqueda de películas con paginación desde input en el navbar (con pantalla de error si no se encuentra ninguna película)

![Búsqueda](https://i.imgur.com/5fCnxOF.png) 

NOTA: La información que se muestra en el sitio es la provista por la API de TMDB, si esta API no tiene una información especifica de una película o persona, esta no se va a mostrar, por ejemplo, si la película en particular no tiene un tráiler, la pestaña de tráileres no se va a mostrar.

Sitio web: [https://damiancabrio.github.io/MovieFlix//](https://damiancabrio.github.io/MovieFlix/) 

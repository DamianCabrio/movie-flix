const tokenAPI = "USE YOUR TMDB TOKEN HERE";
const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${tokenAPI}&language=es-AR&page=1&region=AR`;
const movieUrl = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tokenAPI}&language=es&append_to_response=similar%2Ccredits%2Cvideos%2Cproviders`;
const personUrl = (personId) =>
  `https://api.themoviedb.org/3/person/${personId}?api_key=${tokenAPI}&language=es&append_to_response=movie_credits`;
const searchUrl = (query, page) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${tokenAPI}&language=es-AR&query=${query}&page=${page}&include_adult=false`;

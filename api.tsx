// Importamos las variables desde config.js
import { API_KEY, GENRES } from './config';

// Definimos la URL de la API
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

// Función que obtiene las películas
export const getMovies = async () => {
  try {
    // Usamos el fetch nativo de React Native
    const response = await fetch(API_URL);
    const json = await response.json();

    const movies = json.results.map(
      ({
        id,
        original_title,
        poster_path,
        backdrop_path,
        vote_average,
        overview,
        release_date,
        genre_ids,
      }) => ({
        key: String(id),
        originalTitle: original_title,
        posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
        backdropPath: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
        voteAverage: vote_average,
        description: overview,
        releaseDate: release_date,
        genres: genre_ids.map((id) => GENRES[id]),
      })
    );

    return movies;
  } catch (error) {
    console.error('Error obteniendo las películas: ', error);
    throw error;
  }
};





  
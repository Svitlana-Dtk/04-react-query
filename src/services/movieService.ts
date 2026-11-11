//Функцію fetchMovies для виконання HTTP-запитів винесіть в окремий файл
// src/services/movieService.ts. Типізуйте її параметри, результат,
// який вона повертає, та відповідь від Axios.

import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  results: Movie[];
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data.results;
};

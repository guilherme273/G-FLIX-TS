import { createContext } from "react";
import { Movie, Movies } from "./MovieInterface";

interface MoviesContextType {
  movies: Movies[];
  moviesNoCategory: Movie[];
  favoriteMovies: Movie[];
  fetchMovies: () => Promise<boolean>;
  getMovie: (id_movie: number) => Movie | undefined;
  getMoviesForCategory: (id_category: number) => Movie[];
}

export const MoviesContext = createContext<MoviesContextType>(
  {} as MoviesContextType
);

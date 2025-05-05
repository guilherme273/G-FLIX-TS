import { useState } from "react";
import { MoviesContext } from "./MoviesContext";
import { Movie, Movies } from "./MovieInterface";
import { getMovies } from "./Movie.service";
import { useAuth } from "../Auth/UseAuth";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [moviesNoCategory, setMoviesNoCategory] = useState<Movie[]>([]);
  const [favoriteMovies, setfavoriteMovies] = useState<Movie[]>([]);
  const { getUserID } = useAuth();

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      const userId = getUserID();
      console.log(userId, "i");

      const noCategory = response.movies.flatMap(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (category: any) => category.movies
      );

      const newfavoriteMovies = noCategory.filter((movie: Movie) => {
        return movie.favorites?.some((fav) => fav.id_user === userId);
      });

      setMoviesNoCategory(noCategory);
      setfavoriteMovies(newfavoriteMovies);
      setMovies(response.movies);
      return true;
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return false;
    }
  };

  const getMovie = (id_movie: number) => {
    return moviesNoCategory.find((movie) => movie.id === id_movie);
  };

  const getMoviesForCategory = (id_category: number | undefined) => {
    const movies = moviesNoCategory.filter(
      (movie) => movie.category_id === id_category
    );
    if (!movies) return moviesNoCategory;
    return movies;
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        fetchMovies,
        moviesNoCategory,
        favoriteMovies,
        getMovie,
        getMoviesForCategory,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

import { CirclePlay, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Reactions from "../Reactions/Reactions";
import { Movie } from "../../Movie/MovieInterface";
import { useAuth } from "../../Auth/UseAuth";
import { addOrRemoveToFavorites } from "../../Favorites/Favorites.service";
import "./CardMovieStyle.css";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { addToViews } from "../../ViewsMovies/ViewsMovies.service";

interface CardMovieProps {
  movie: Movie;
  fethMovies: () => Promise<void>;
}

const CardMovie: React.FC<CardMovieProps> = ({ movie, fethMovies }) => {
  const { getUserID } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addFavorites = async (id_movie: number) => {
    setIsLoading(true);

    const data = {
      id_movie,
    };
    await addOrRemoveToFavorites(data);
    await fethMovies();
    setIsLoading(false);
  };

  const addView = async (id_movie: number) => {
    const data = {
      id_movie,
    };
    await addToViews(data);
  };

  const isFavorited = movie.favorites.some(
    (favorite) => favorite.id_user === getUserID()
  );
  return (
    <>
      <div key={movie.id} className="card-movie">
        <div className="div-favoritos">
          <p className="views-count">
            {movie.views.length}{" "}
            {`${movie.views.length === 1 ? "Visualização" : "Visualizações"}`}
          </p>
          {isLoading ? (
            <Loading color={"red"} size={20} padding={5} />
          ) : isFavorited ? (
            <img
              title="Remover da lista de favoritos"
              onClick={() => addFavorites(movie.id)}
              className="icon-favoritos"
              src="/public/assets/star.png"
              alt=""
            />
          ) : (
            <Star
              onClick={() => addFavorites(movie.id)}
              className="icon-favoritos"
            >
              <title>Adicionar a lista de favoritos</title>
            </Star>
          )}
        </div>
        <div className="div-icon-and-link-img">
          <Link
            onClick={() => addView(movie.id)}
            to={"/assistir"}
            className="image-container"
          >
            <img src={movie.cover} alt="Capa" className="img-movie" />
            <CirclePlay className="icon-play-movie" />
          </Link>
        </div>
        <div className="info-movie">
          <p>{movie.title}</p>
        </div>
        <Reactions movie={movie} fethMovies={fethMovies} />
      </div>
    </>
  );
};

export default CardMovie;

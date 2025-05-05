import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Header from "../../Components/Header/Header";
import Reactions from "../../Components/Reactions/Reactions";
import "./WatchStyle.css";
import { Eye, Star } from "lucide-react";
import { addOrRemoveToFavorites } from "../../Favorites/Favorites.service";
import { useAuth } from "../../Contexts/Auth/UseAuth";
import { useMovies } from "../../Contexts/Movies/useMovies";
import Loading from "../../Components/Loading/Loading";
import { useEffect, useState } from "react";
import { Movie } from "../../Contexts/Movies/MovieInterface";
import SectionCarousel from "../../Components/SectionCarousel/SectionCarousel";

const Watch: React.FC = () => {
  const { id, category_id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getUserID } = useAuth();
  const { fetchMovies, getMovie, moviesNoCategory, getMoviesForCategory } =
    useMovies();
  const [movie, setMovie] = useState<Movie | undefined>();
  const moviesThisCategory = getMoviesForCategory(Number(category_id));

  useEffect(() => {
    setMovie(getMovie(Number(id)));
  }, [moviesNoCategory]);

  const addFavorites = async (id_movie: number) => {
    setIsLoading(true);

    const data = {
      id_movie,
    };
    await addOrRemoveToFavorites(data);
    await fetchMovies();
    setIsLoading(false);
  };
  const isFavorited = movie?.favorites.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (favorite: any) => favorite.id_user === getUserID()
  );
  return (
    <>
      <GeneralSection>
        <Header />
        <section className="container-watch-page">
          <section className="watch-page">
            {movie ? (
              <div className="video-container">
                <div className="views-count-watch">
                  <p className="views-count">
                    <Eye size={25} strokeWidth={1.1} color={"aliceblue"} />
                    {movie.views.length}{" "}
                    {`${
                      movie.views.length === 1
                        ? "Visualização"
                        : "Visualizações"
                    } `}
                  </p>
                </div>
                <iframe
                  src={`https://www.youtube.com/embed/dS-xvxLSrkI`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="reactions-container">
                  <div>
                    <Reactions movie={movie} />
                  </div>

                  <div>
                    {isLoading ? (
                      <Loading color={"red"} size={20} padding={5} />
                    ) : isFavorited ? (
                      <img
                        title="Remover da lista de favoritos"
                        onClick={() => addFavorites(movie.id)}
                        className="icon-favoritos"
                        src="/assets/star.png"
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
                </div>
              </div>
            ) : (
              <Loading color="red" size={200} padding={100} />
            )}
          </section>
          <h5>Filmes da mesma categoria</h5>
          <SectionCarousel movies={moviesThisCategory} />
        </section>
        <Footer />
      </GeneralSection>
    </>
  );
};

export default Watch;

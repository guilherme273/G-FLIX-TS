import { useLocation } from "react-router-dom";
import BannerSearch from "../../Components/BannerSearch/BannerSearch";
import Footer from "../../Components/Footer/Footer";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Header from "../../Components/Header/Header";
import { imagesbanner } from "../../Utils/BannerImages";
import { useEffect, useState } from "react";
import CardMovie from "../../Components/CardMovie/CardMovie";
import "./SearchStyle.css";
import Loading from "../../Components/Loading/Loading";
import { useMovies } from "../../Contexts/Movies/useMovies";
import { Movie } from "../../Contexts/Movies/MovieInterface";

const Search: React.FC = () => {
  const location = useLocation();
  const { termo } = location.state || {};
  const { moviesNoCategory, fetchMovies } = useMovies();
  const [moviesSearch, setMoviesSearch] = useState<Movie[]>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const filterMovies = async () => {
    setIsloading(true);
    await fetchMovies();
    setMoviesSearch(moviesNoCategory);
    setIsloading(false);
  };

  useEffect(() => {
    filterMovies();
  }, []);

  return (
    <>
      <GeneralSection>
        <Header />
        <BannerSearch
          images={imagesbanner}
          text={termo}
          movies={moviesNoCategory}
          setMoviesSearch={setMoviesSearch}
          setIsloading={setIsloading}
        />

        <section className="container-search">
          {isLoading ? (
            <Loading padding={300} color="red" size={100} />
          ) : moviesSearch?.length === 0 ? (
            <h1 className="h1-no-favofites">Sem Resultados! :(</h1>
          ) : (
            <>
              {moviesSearch?.map((movie) => {
                return <CardMovie key={movie.id} movie={movie} />;
              })}
            </>
          )}
        </section>

        <Footer />
      </GeneralSection>
    </>
  );
};

export default Search;

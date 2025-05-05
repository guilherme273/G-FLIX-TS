import { useEffect, useState } from "react";
import BannerFavorites from "../../Components/BannerFavorites/BannerFavoritos";
import Footer from "../../Components/Footer/Footer";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Header from "../../Components/Header/Header";
import { imagesbannerfavorites } from "../../Utils/BannerImages";
import "./FavoritesStyle.css";
import Loading from "../../Components/Loading/Loading";
import CardMovie from "../../Components/CardMovie/CardMovie";
import { useMovies } from "../../Contexts/Movies/useMovies";
import { h1 } from "framer-motion/client";

const Favorites: React.FC = () => {
  const { fetchMovies, favoriteMovies } = useMovies();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const filterMovies = async () => {
    setIsloading(true);
    await fetchMovies();
    setIsloading(false);
  };

  useEffect(() => {
    filterMovies();
  }, []);

  return (
    <>
      <GeneralSection>
        <Header />

        <BannerFavorites images={imagesbannerfavorites} />
        <section className="container-search">
          {isLoading ? (
            <Loading padding={300} color="red" size={100} />
          ) : favoriteMovies.length === 0 ? (
            <h1 className="h1-no-favofites">
              Nenhum filme adicionado como favoritos no momento!
            </h1>
          ) : (
            <>
              {favoriteMovies.map((movie) => (
                <CardMovie key={movie.id} movie={movie} />
              ))}
            </>
          )}
        </section>

        <Footer />
      </GeneralSection>
    </>
  );
};

export default Favorites;

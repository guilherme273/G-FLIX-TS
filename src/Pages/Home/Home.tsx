import React, { useEffect, useState } from "react";
import "./HomeStyle.css";
import Header from "../../Components/Header/Header";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import Banner from "../../Components/Banner/Banner";
import { getMovies } from "../../Movie/Movie.service";
import { Movies } from "../../Movie/MovieInterface";
import CategoryesMovie from "../../Components/CategoryesMovies/CategoryesMovie";
import Loading from "../../Components/Loading/Loading";
import Footer from "../../Components/Footer/Footer";

const imagesbanner = [
  { prevImg: "image1", url: "/assets/banner-home.png" },
  { prevImg: "image2", url: "/assets/banner-assistir.png" },
];

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Movies[]>([]);

  const fethMovies = async () => {
    setTimeout(async () => {
      try {
        const data = await getMovies();
        setCategories(data.movies);
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  };
  useEffect(() => {
    fethMovies();
  }, []);

  return (
    <GeneralSection>
      <Header />
      <Banner images={imagesbanner} />
      <section className="container-home">
        {categories.length === 0 ? (
          <Loading padding={100} color="red" size={100} />
        ) : (
          categories.map((category) => (
            <CategoryesMovie
              key={category.id}
              category={category.name}
              movies={category.movies}
              fethMovies={fethMovies}
            />
          ))
        )}
      </section>
      <Footer />
    </GeneralSection>
  );
};

export default Home;

import { Movie } from "../../Movie/MovieInterface";
import SectionCarousel from "../SectionCarousel/SectionCarousel";
import "./CategoryesMovieStyle.css";

interface propsCategoryMovie {
  movies: Movie[];
  category: string;
  fethMovies: () => Promise<void>;
}

const CategoryesMovie: React.FC<propsCategoryMovie> = ({
  movies,
  category,
  fethMovies,
}) => {
  return (
    <>
      <section className="category-movie">
        <h4 className="category-title">{category}</h4>
        <SectionCarousel fethMovies={fethMovies} movies={movies} />
      </section>
    </>
  );
};

export default CategoryesMovie;

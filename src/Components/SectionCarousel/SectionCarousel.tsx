import { useRef } from "react";
import { Movie } from "../../Movie/MovieInterface";
import ButtonsCarousel from "../ButtonsCarousel/ButtonsCarousel";
import CardMovie from "../CardMovie/CardMovie";
import "./SectionCarouselStyle.css";

interface SectionCarouselProps {
  movies: Movie[];
  fethMovies: () => Promise<void>;
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({
  movies,
  fethMovies,
}) => {
  const carousel = useRef<HTMLDivElement | null>(null);

  const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth;
    }
  };

  const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth;
    }
  };

  return (
    <>
      <section className="div-carousel" ref={carousel}>
        {movies.map((movie: Movie) => {
          return <CardMovie movie={movie} fethMovies={fethMovies} />;
        })}
      </section>
      <ButtonsCarousel scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </>
  );
};

export default SectionCarousel;

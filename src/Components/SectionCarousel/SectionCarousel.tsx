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

  const smoothScroll = (
    element: HTMLElement,
    distance: number,
    duration: number
  ) => {
    const start = element.scrollLeft;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      element.scrollLeft = start + distance * easeInOutQuad(progress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      smoothScroll(carousel.current, -carousel.current.offsetWidth, 2000); // 2000ms
    }
  };

  const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (carousel.current) {
      smoothScroll(carousel.current, carousel.current.offsetWidth, 2000); // 2000ms
    }
  };

  return (
    <>
      <section className="div-carousel" ref={carousel}>
        {movies.map((movie: Movie) => {
          return (
            <CardMovie key={movie.id} movie={movie} fethMovies={fethMovies} />
          );
        })}
      </section>
      <ButtonsCarousel scrollLeft={scrollLeft} scrollRight={scrollRight} />
    </>
  );
};

export default SectionCarousel;

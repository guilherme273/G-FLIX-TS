import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import "./SectionCarouselStyle.css";
import { Movie } from "../../Movie/MovieInterface";

interface SectionCarouselProps {
  movies: Movie[];
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({ movies }) => {
  const cards = useRef<HTMLDivElement | null>(null);

  const scrollLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cards.current) {
      cards.current.scrollLeft -= cards.current.offsetWidth;
    }
  };

  const scrollRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (cards.current) {
      cards.current.scrollLeft += cards.current.offsetWidth;
    }
  };

  return (
    <>
      <section className="div-carousel" ref={cards}>
        {movies.map((movie: Movie) => {
          const laicado = false;

          return (
            <div key={movie.id} className="card-movie">
              <div className="div-icon-and-link-img">
                <Link to={"/assistir"} className="image-container">
                  <img src={movie.cover} alt="Capa" className="image" />
                </Link>

                {laicado ? (
                  <img
                    // onClick={() => disdeuLike(movie.id)}
                    className="icon"
                    src="/img/coracao-preenchido.png"
                  />
                ) : (
                  <Heart
                    // onClick={() => deuLike(movie.id)}
                    className="icon"
                    size={38}
                  />
                )}
              </div>
              <div className="info-movie">
                <p>{movie.title}</p>
              </div>
            </div>
          );
        })}
      </section>
      <div className="buttons">
        <button onClick={(e) => scrollLeft(e)}>
          <ChevronLeft size={40} />
        </button>
        <button onClick={(e) => scrollRight(e)}>
          <ChevronRight size={40} />
        </button>
      </div>
    </>
  );
};

export default SectionCarousel;

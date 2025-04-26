import {
  Angry,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Heart,
  Smile,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./SectionCarouselStyle.css";
import { Movie } from "../../Movie/MovieInterface";
import { makeReaction } from "../../Reactions/Reactions.service";
import { useAuth } from "../../Auth/UseAuth";

interface SectionCarouselProps {
  movies: Movie[];
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({ movies }) => {
  const cards = useRef<HTMLDivElement | null>(null);
  const [loadingReaction, setLoadingReaction] = useState<boolean>(false);
  const { userId } = useAuth();

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

  const SendReaction = async (id_reaction: number, id_movie: number) => {
    setLoadingReaction(true);
    setTimeout(async () => {
      const data = {
        id_user: userId,
        id_reactions_type: id_reaction,
        id_movie,
      };
      await makeReaction(data);
      console.log(data);
      setLoadingReaction(false);
    }, 3000);
  };

  return (
    <>
      <section className="div-carousel" ref={cards}>
        {movies.map((movie: Movie) => {
          // const laicado = false;

          return (
            <div key={movie.id} className="card-movie">
              <div className="div-favoritos">
                <Star className="icon-favoritos" />
                {/* <img
                  className="icon-favoritos"
                  src="/public/assets/star.png"
                  alt=""
                /> */}
              </div>
              <div className="div-icon-and-link-img">
                <Link to={"/assistir"} className="image-container">
                  <img src={movie.cover} alt="Capa" className="img-movie" />
                  <CirclePlay className="icon-play-movie" />
                </Link>
              </div>
              <div className="info-movie">
                <p>{movie.title}</p>
              </div>
              <div className="reaction-icons">
                <div className="div-count-reaction">
                  <p className="count-reaction">
                    {movie.reactionCounts[1] | 0}
                  </p>
                  <ThumbsUp
                    onClick={() => SendReaction(1, movie.id)}
                    className={`reaction-icon like-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">
                    {movie.reactionCounts[2] | 0}
                  </p>
                  <ThumbsDown
                    onClick={() => SendReaction(2, movie.id)}
                    className={`reaction-icon like-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">
                    {movie.reactionCounts[3] | 0}
                  </p>
                  <Heart
                    onClick={() => SendReaction(3, movie.id)}
                    className={`reaction-icon heart-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">
                    {movie.reactionCounts[4] | 0}
                  </p>
                  <Smile
                    onClick={() => SendReaction(4, movie.id)}
                    className={`reaction-icon emoji-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">
                    {movie.reactionCounts[5] | 0}
                  </p>
                  <Angry
                    onClick={() => SendReaction(5, movie.id)}
                    className={`reaction-icon emoji-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                  />
                </div>

                {/* <div className="div-count-reaction">
                  <p className="count-reaction">35</p>
                  <img
                    onClick={() => SendReaction(1, movie.id)}
                    className={`img-reaction-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                    src="/assets/like.png"
                    alt=""
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">35</p>
                  <img
                    onClick={() => SendReaction(2, movie.id)}
                    className={`img-reaction-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                    src="/assets/deslike.png"
                    alt=""
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">35</p>
                  <img
                    onClick={() => SendReaction(3, movie.id)}
                    className={`img-reaction-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                    src="/public/assets/heart.png"
                    alt=""
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">35</p>
                  <img
                    onClick={() => SendReaction(4, movie.id)}
                    className={`img-reaction-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                    src="/public/assets/smile.png"
                    alt=""
                  />
                </div>
                <div className="div-count-reaction">
                  <p className="count-reaction">35</p>
                  <img
                    onClick={() => SendReaction(5, movie.id)}
                    className={`img-reaction-icon${
                      loadingReaction ? " disabled-icon-reaction" : ""
                    }`}
                    src="/public/assets/angry.png"
                    alt=""
                  />
                </div> */}
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

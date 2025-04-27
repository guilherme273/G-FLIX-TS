import { Angry, Heart, Smile, ThumbsDown, ThumbsUp } from "lucide-react";
import { Movie } from "../../Movie/MovieInterface";
import { makeReaction } from "../../Reactions/Reactions.service";
import { useState } from "react";
import { useAuth } from "../../Auth/UseAuth";
import { Reaction } from "../../Reactions/ReactionsInterface";
import "./Reactions.style.css";

interface RactionsProps {
  movie: Movie;
  fethMovies: () => Promise<void>;
}

const Reactions: React.FC<RactionsProps> = ({ movie, fethMovies }) => {
  const [loadingReaction, setLoadingReaction] = useState<boolean>(false);
  const { userId } = useAuth();

  const getUserReactionType = (
    reactions: Reaction[],
    userId: number | null | undefined
  ) => {
    const userReaction = reactions.find(
      (reaction) => reaction.id_user === userId
    );
    return userReaction ? userReaction.id_reactions_type : null;
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
      await fethMovies();
      setLoadingReaction(false);
    }, 3000);
  };

  const userReactionType = getUserReactionType(movie.reactions, userId);
  return (
    <>
      <div className="reaction-icons">
        {/* Like */}
        <div className="div-count-reaction">
          <p className="count-reaction">{movie.reactionCounts[1] || 0}</p>
          {userReactionType === 1 ? (
            <img
              title="Remover Reação"
              onClick={() => SendReaction(1, movie.id)}
              className={`img-reaction-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
              src="/assets/like.png"
              alt=""
            />
          ) : (
            <ThumbsUp
              onClick={() => SendReaction(1, movie.id)}
              className={`reaction-icon like-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
            >
              <title>Reagir</title>
            </ThumbsUp>
          )}
        </div>

        {/* Dislike */}
        <div className="div-count-reaction">
          <p className="count-reaction">{movie.reactionCounts[2] || 0}</p>
          {userReactionType === 2 ? (
            <img
              title="Remover Reação"
              onClick={() => SendReaction(2, movie.id)}
              className={`img-reaction-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
              src="/assets/deslike.png"
              alt=""
            />
          ) : (
            <ThumbsDown
              onClick={() => SendReaction(2, movie.id)}
              className={`reaction-icon like-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
            >
              <title>Reagir</title>
            </ThumbsDown>
          )}
        </div>

        {/* Love */}
        <div className="div-count-reaction">
          <p className="count-reaction">{movie.reactionCounts[3] || 0}</p>
          {userReactionType === 3 ? (
            <img
              title="Remover Reação"
              onClick={() => SendReaction(3, movie.id)}
              className={`img-reaction-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
              src="/public/assets/heart.png"
              alt=""
            />
          ) : (
            <Heart
              onClick={() => SendReaction(3, movie.id)}
              className={`reaction-icon heart-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
            >
              <title>Reagir</title>
            </Heart>
          )}
        </div>

        {/* Smile */}
        <div className="div-count-reaction">
          <p className="count-reaction">{movie.reactionCounts[4] || 0}</p>
          {userReactionType === 4 ? (
            <img
              title="Remover Reação"
              onClick={() => SendReaction(4, movie.id)}
              className={`img-reaction-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
              src="/public/assets/smile.png"
              alt=""
            />
          ) : (
            <Smile
              onClick={() => SendReaction(4, movie.id)}
              className={`reaction-icon emoji-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
            >
              <title>Reagir</title>
            </Smile>
          )}
        </div>

        {/* Angry */}
        <div className="div-count-reaction">
          <p className="count-reaction">{movie.reactionCounts[5] || 0}</p>
          {userReactionType === 5 ? (
            <img
              title="Remover Reação"
              onClick={() => SendReaction(5, movie.id)}
              className={`img-reaction-icon${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
              src="/public/assets/angry.png"
              alt=""
            />
          ) : (
            <Angry
              onClick={() => SendReaction(5, movie.id)}
              className={`reaction-icon emoji-icon-angry${
                loadingReaction ? " disabled-icon-reaction" : ""
              }`}
            >
              <title>Reagir</title>
            </Angry>
          )}
        </div>
      </div>
    </>
  );
};

export default Reactions;

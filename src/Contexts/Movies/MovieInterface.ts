import { Favorites } from "../../Favorites/FavoritesInterface";
import { Reaction } from "../../Reactions/ReactionsInterface";
import { Views } from "../../ViewsMovies/ViewsMoviesInterface";

export interface Movie {
  id: number;
  title: string;
  url: string;
  cover: string;
  category_id: number;
  youtube_id: string;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
  reactionCounts: {
    [reactionTypeId: number]: number;
  };
  favorites: Favorites[];
  views: Views[];
}

export interface Movies {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  movies: Movie[];
}
export interface addMovieDto {
  url: string;
  category_id: string;
}

import { Favorites } from "../Favorites/FavoritesInterface";
import { Reaction } from "../Reactions/ReactionsInterface";

export interface Movie {
  id: number;
  title: string;
  url: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
  reactionCounts: {
    [reactionTypeId: number]: number;
  };
  favorites: Favorites[];
}

export interface Movies {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  movies: Movie[];
}

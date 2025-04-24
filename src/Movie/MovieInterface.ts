export interface Movies {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  movies: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  url: string;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

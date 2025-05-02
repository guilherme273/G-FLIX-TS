import api from "../Api/Axios";
import { ViewsMoviesDTO } from "./ViewsMovies.dto";

export const addToViews = async (data: ViewsMoviesDTO) => {
  const response = await api.post("/view", data);
  return response.data;
};

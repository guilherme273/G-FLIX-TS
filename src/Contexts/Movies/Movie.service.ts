import api from "../../Api/Axios";

export const getMovies = async () => {
  const response = await api.get("/movie");
  return response.data;
};

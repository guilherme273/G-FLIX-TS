import api from "../Api/Axios";
import { toast_fy } from "../Toast/Toast";
import { FavoritesDTO } from "./Favorites.dto";

export const addOrRemoveToFavorites = async (data: FavoritesDTO) => {
  const response = await api.post("/favorites", data);
  toast_fy(response.data);
  return response.data;
};

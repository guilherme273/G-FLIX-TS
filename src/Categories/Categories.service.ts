import api from "../Api/Axios";

export const getCategories = async () => {
  const response = await api.get("/category");
  return response.data;
};

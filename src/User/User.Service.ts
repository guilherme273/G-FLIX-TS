import api from "../Api/Axios";
import { toast_fy } from "../Utils/Toast/Toast";
import { RegisterDTO } from "../User/Register.dto";

export const registerUser = async (data: RegisterDTO) => {
  const response = await api.post("/user", data);
  toast_fy(response.data);
  return response.data;
};
export const getUser = async () => {
  const response = await api.get("/user");
  return response.data;
};
export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

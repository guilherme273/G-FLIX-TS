import api from "../Api/Axios";
import { RegisterDTO } from "../User/Register.dto";

export const registerUser = async (data: RegisterDTO) => {
  const response = await api.post("/user", data);
  return response.data;
};

import api from "../Api/Axios";
import { toast_fy } from "../Toast/Toast";
import { RegisterDTO } from "../User/Register.dto";

export const registerUser = async (data: RegisterDTO) => {
  const response = await api.post("/user", data);
  toast_fy(response.data);
  return response.data;
};

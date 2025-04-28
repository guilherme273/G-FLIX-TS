import api from "../Api/Axios";
import { toast_fy } from "../Toast/Toast";
import { LoginDTO } from "../User/Login.dto";

interface AuthResponse {
  access_token: string;
  userId: number;
}

export const loginRequest = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/signin", data);
  toast_fy(response.data);
  return response.data;
};

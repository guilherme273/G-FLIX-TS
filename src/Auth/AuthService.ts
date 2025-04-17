import api from "../Api/Axios";
import { LoginDTO } from "../User/Login.dto";
import { User } from "../User/UserInterface";

interface AuthResponse {
  token: string;
  user: User;
}

export const loginRequest = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth", data);
  return response.data;
};

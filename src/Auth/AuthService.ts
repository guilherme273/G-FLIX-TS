import api from "../Api/Axios";
import { User } from "../User/UserInterface";

interface AuthResponse {
  token: string;
  user: User;
}

export const loginRequest = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/login", { email, password });
  return response.data;
};

import { createContext } from "react";
import { User } from "../User/UserInterface";
import { LoginDTO } from "../User/Login.dto";

interface AuthContextType {
  user: User | null | undefined;
  userId: number | null | undefined;
  token: string | null;
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

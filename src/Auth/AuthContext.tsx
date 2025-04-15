import { createContext } from "react";
import { User } from "../User/UserInterface";

interface AuthContextType {
  user: User | null | undefined;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

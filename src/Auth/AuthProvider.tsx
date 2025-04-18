import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../User/UserInterface";
import { loginRequest } from "./AuthService";
import { LoginDTO } from "../User/Login.dto";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (data: LoginDTO) => {
    const response = await loginRequest(data);
    const { access_token, user } = response;

    setToken(access_token);
    setUser(user);
    localStorage.setItem("token", access_token);
    console.log(token);
    console.log(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

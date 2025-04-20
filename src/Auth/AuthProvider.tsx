import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../User/UserInterface";
import { loginRequest } from "./AuthService";
import { LoginDTO } from "../User/Login.dto";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [userId, setUserID] = useState<number>();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (data: LoginDTO) => {
    const response = await loginRequest(data);
    const { access_token, userId } = response;

    setToken(access_token);
    setUserID(userId);
    localStorage.setItem("token", access_token);
    console.log(user);
    console.log(token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log(user);
    console.log(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

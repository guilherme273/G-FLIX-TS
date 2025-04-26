import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../User/UserInterface";
import { loginRequest } from "./AuthService";
import { LoginDTO } from "../User/Login.dto";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>();
  const [userId, setUserID] = useState<number | null | undefined>(
    Number(localStorage.getItem("user"))
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = async (data: LoginDTO) => {
    const response = await loginRequest(data);
    const { access_token, userId } = response;

    setToken(access_token);
    setUserID(userId);
    console.log("user_id", userId);
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", String(userId));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        userId,
        setToken,
        setUserID,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { DecodedToken } from "../Auth/Jwt";
import { useAuth } from "../Auth/UseAuth";

const LoggedIn: React.FC = () => {
  const { setisLogged } = useAuth();

  const isAuthenticated = () => {
    const isThereToken = localStorage.getItem("token");
    if (isThereToken) {
      const decoded = jwtDecode<DecodedToken>(isThereToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setisLogged(false);
        return false;
      } else {
        return true;
      }
    }

    setisLogged(false);
    return false;
  };

  const isLogged = isAuthenticated();
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default LoggedIn;

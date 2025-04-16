import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Auth/UseAuth";

const LoggedIn: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default LoggedIn;

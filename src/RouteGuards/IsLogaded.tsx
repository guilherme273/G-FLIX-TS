import { Navigate, Outlet } from "react-router-dom";

const IsLogaded: React.FC = () => {
  const logado = false;
  return logado ? <Outlet /> : <Navigate to="/login" />;
};

export default IsLogaded;

import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { authGuard } from "../Auth/AuthService";
import GeneralLoading from "../Components/Loading/GeneralLoading";

const LoggedIn: React.FC = () => {
  const [isLogged, setisLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsLogged = async () => {
      setTimeout(async () => {
        const result = await authGuard();
        setisLogged(result);
      }, 3000);
    };

    checkIsLogged();
  }, []);

  if (isLogged === null) {
    return <GeneralLoading />;
  }

  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default LoggedIn;

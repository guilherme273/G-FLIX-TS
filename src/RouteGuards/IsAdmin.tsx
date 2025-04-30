import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { adminGuard } from "../Admin/Admin.service";
import GeneralLoading from "../Components/Loading/GeneralLoading";

const IsAdmin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      setTimeout(async () => {
        const result = await adminGuard();
        setIsAdmin(result);
      }, 3000);
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <GeneralLoading />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default IsAdmin;

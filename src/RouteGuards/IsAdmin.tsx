import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../Components/Loading/Loading";
import GeneralSection from "../Components/GeneralSection/GeneralSection";
import Footer from "../Components/Footer/Footer";
import { adminGuard } from "../Admin/Admin.service";

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
    return (
      <GeneralSection>
        <div className="section-loading">
          <Loading color={"red"} size={50} padding={10} />
        </div>
        <Footer />
      </GeneralSection>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default IsAdmin;

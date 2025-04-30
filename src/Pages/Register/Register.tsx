import React from "react";
import "./RegisterStyle.css";
import GeneralSectionAuth from "../../Components/GeneralSectionAuth/GeneralSectionAuth";
import CenterSquare from "../../Components/CenterSquare/CenterSquare";
// import { UserPen } from "lucide-react";
import DivNavigateAuth from "../../Components/Forms/DivNavigateAuth/DivNavigateAuth";
import FormRegister from "../../Components/Forms/FormRegister/FormRegister";

const Register: React.FC = () => {
  return (
    <>
      <GeneralSectionAuth>
        <CenterSquare>
          <img src="/assets/logo-g.png" className="logo-g-flix-login" alt="" />
          {/* <UserPen className="icon-user" size={150} strokeWidth={0.5} /> */}
          <FormRegister />
          <DivNavigateAuth
            sentence={"Já possui uma conta?"}
            word={"Entrar"}
            link={"/login"}
          />
        </CenterSquare>
      </GeneralSectionAuth>
    </>
  );
};

export default Register;

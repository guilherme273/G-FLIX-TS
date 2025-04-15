import React from "react";
import "./RegisterStyle.css";
import GeneralSectionAuth from "../../Components/GeneralSectionAuth/GeneralSectionAuth";
import CenterSquare from "../../Components/CenterSquare/CenterSquare";
import { UserPen } from "lucide-react";
import DivNavigateAuth from "../../Components/Forms/DivRegister/DivNavigateAuth";
import FormRegister from "../../Components/Forms/FormRegister/FormRegister";

const Register: React.FC = () => {
  return (
    <>
      <GeneralSectionAuth>
        <CenterSquare>
          <h2 className="title-login">G Flix</h2>
          <UserPen className="icon-user" size={150} strokeWidth={0.5} />
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

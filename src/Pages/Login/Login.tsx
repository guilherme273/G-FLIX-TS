import React from "react";
import CenterSquare from "../../Components/CenterSquare/CenterSquare";
import GeneralSectionAuth from "../../Components/GeneralSectionAuth/GeneralSectionAuth";
import FormLogin from "../../Components/Forms/FormLogin/FormLogin";

import "./Login.Style.css";
import { CircleUserRound } from "lucide-react";
import DivNavigateAuth from "../../Components/Forms/DivRegister/DivNavigateAuth";

const Login: React.FC = () => {
  return (
    <>
      <GeneralSectionAuth>
        <CenterSquare>
          <h2 className="title-login">G Flix</h2>
          <CircleUserRound className="icon-user" size={150} strokeWidth={0.5} />
          <FormLogin />
          <DivNavigateAuth
            sentence={"Ainda não possui conta?"}
            word={"Cadastre-se"}
            link={"/register"}
          />
        </CenterSquare>
      </GeneralSectionAuth>
    </>
  );
};

export default Login;

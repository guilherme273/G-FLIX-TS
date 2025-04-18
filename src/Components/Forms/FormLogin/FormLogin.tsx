import { AtSign, LockKeyhole } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginDTO } from "../../../User/Login.dto";
import InputAuth from "../InputAuth/InputAuth";
import "./FormLoginStyle.css";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useAuth } from "../../../Auth/UseAuth";

const FormLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDTO>();

  const { login } = useAuth();
  const makeRequest: SubmitHandler<LoginDTO> = async (data: LoginDTO) => {
    const response = await login(data);
    // console.log(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit(makeRequest)} className="formulario-login">
        <InputAuth
          icon={AtSign}
          type={"text"}
          placeholder={"Email"}
          inputName={"email"}
          register={register}
          error={
            errors?.email?.type === "required" ? "Email obrigatório" : undefined
          }
        />

        <InputAuth
          icon={LockKeyhole}
          type={"password"}
          placeholder={"Senha"}
          inputName={"password"}
          register={register}
          error={
            errors?.password?.type === "required"
              ? "Senha obrigatória"
              : undefined
          }
        />
        <SubmitButton disableButton={isSubmitting} text="Entrar" />
      </form>
    </>
  );
};

export default FormLogin;

import { AtSign, LockKeyhole } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginDTO } from "../../../User/Login.dto";
import InputAuth from "../InputAuth/InputAuth";
import "./FormLoginStyle.css";
import SubmitButton from "../SubmitButton/SubmitButton";

const FormLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>();

  const makeRequest: SubmitHandler<LoginDTO> = (data) => {
    console.log(data);
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
        <SubmitButton text="Entrar" />
      </form>
    </>
  );
};

export default FormLogin;

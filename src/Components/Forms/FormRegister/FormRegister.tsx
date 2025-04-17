import React from "react";
import { useForm } from "react-hook-form";

import { AtSign, Lock, LockKeyhole, User } from "lucide-react";
import InputAuth from "../InputAuth/InputAuth";
import SubmitButton from "../SubmitButton/SubmitButton";
import { registerUser } from "../../../User/User.Service";
import { RegisterData } from "../../../User/Register.dto";

const FormRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>();
  const matchPassword = watch("password");

  const makeRequest = async (data: RegisterData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...requestData } = data;
    const response = await registerUser(requestData);
    console.log(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit(makeRequest)} className="formulario-login">
        <InputAuth
          icon={User}
          type={"text"}
          placeholder={"Nome"}
          inputName={"name"}
          register={register}
          error={
            errors?.name?.type === "required" ? "Nome obrigatório" : undefined
          }
        />

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
          icon={Lock}
          type={"password"}
          placeholder={"Senha"}
          inputName={"password"}
          register={register}
          error={
            errors?.password?.type === "required"
              ? "Senha obrigatório"
              : undefined
          }
        />

        <div className="w-100">
          <div className="div-input-auth">
            <LockKeyhole
              size={35}
              strokeWidth={0.5}
              className="icon-form-auth"
            />
            <input
              type={"password"}
              placeholder={"Confirme a senha"}
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === matchPassword,
              })}
            />
          </div>
          {errors?.confirmPassword?.type === "required" && (
            <p className="p-alert">Confirmação de seha obrigatória</p>
          )}
          {errors?.confirmPassword?.type === "validate" && (
            <p className="p-alert">As senhas não conferem</p>
          )}
        </div>
        <SubmitButton text="Registrar-se" />
      </form>
    </>
  );
};

export default FormRegister;

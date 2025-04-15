import React from "react";
import { LucideIcon } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import "./InputAuthStyle.css";

interface InputAuthProps {
  icon: LucideIcon;
  type: string;
  placeholder: string;
  inputName: "name" | "email" | "password" | "confirmPassword";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
}

const InputAuth: React.FC<InputAuthProps> = ({
  icon: Icon,
  type,
  placeholder,
  inputName,
  register,
  error,
}) => {
  return (
    <>
      <div className="w-100">
        <div className="div-input-auth">
          {<Icon size={35} strokeWidth={0.5} className="icon-form-auth" />}
          <input
            type={type}
            placeholder={placeholder}
            {...register(inputName, { required: true })}
          />
        </div>
        {error && <p className="p-alert">{error}</p>}
      </div>
    </>
  );
};

export default InputAuth;

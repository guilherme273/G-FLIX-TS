import React from "react";
import "./SubmitButtonStyle.css";

interface SubmitButtonProps {
  text: string;
  disableButton: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disableButton }) => {
  return (
    <>
      <button
        className={
          disableButton ? "submit-button-auth-disable" : "submit-buttom-auth"
        }
        type="submit"
        disabled={disableButton}
      >
        {text}
      </button>
    </>
  );
};

export default SubmitButton;

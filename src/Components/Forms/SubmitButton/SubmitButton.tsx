import React from "react";
import "./SubmitButtonStyle.css";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  return (
    <>
      <button className="submit-buttom-auth" type="submit">
        {text}
      </button>
    </>
  );
};

export default SubmitButton;

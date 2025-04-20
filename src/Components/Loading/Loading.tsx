import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
  color: string;
  size: number;
}

const Loading: React.FC<LoadingProps> = ({ color, size }) => {
  return (
    <>
      <ClipLoader color={color} size={size} />
    </>
  );
};

export default Loading;

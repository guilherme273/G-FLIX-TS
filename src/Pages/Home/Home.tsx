import React from "react";
import "./HomeStyle.css";
import Loading from "../../Components/Loading/Loading";

const Home: React.FC = () => {
  return (
    <>
      <h1>home</h1>
      <Loading color={"blue"} size={20} />
    </>
  );
};

export default Home;

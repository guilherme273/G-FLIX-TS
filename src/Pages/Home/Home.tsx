import React from "react";
import "./HomeStyle.css";
import Header from "../../Components/Header/Header";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
import { is } from "../../Auth/AuthService";

const Home: React.FC = () => {
  return (
    <>
      <GeneralSection>
        <Header />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={is}>dsadads</button>
      </GeneralSection>
    </>
  );
};

export default Home;

import React from "react";
import "./HomeStyle.css";
import Header from "../../Components/Header/Header";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";

const Home: React.FC = () => {
  return (
    <>
      <GeneralSection>
        <Header />
      </GeneralSection>
    </>
  );
};

export default Home;

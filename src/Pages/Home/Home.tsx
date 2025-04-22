import React from "react";
import "./HomeStyle.css";
import Header from "../../Components/Header/Header";
import GeneralSection from "../../Components/GeneralSection/GeneralSection";
// import { is } from "../../Auth/AuthService";
import Banner from "../../Components/Banner/Banner";

const imagesbanner = [
  {
    prevImg: "image1",
    url: "/assets/banner-home.png",
  },
  {
    prevImg: "image2",
    url: "/assets/banner-assistir.png",
  },
];

const Home: React.FC = () => {
  return (
    <>
      <GeneralSection>
        <Header />
        <Banner images={imagesbanner} />
        <section className="container-home"></section>
      </GeneralSection>
    </>
  );
};

export default Home;

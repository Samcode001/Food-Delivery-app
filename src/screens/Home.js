import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero_carousel from "../components/Hero_carousel";
import Food_category from "../components/Food_category";
import Food_items from "../components/Food_items";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Restraunts from "../components/Restraunts.jsx";

const Home = () => {
  const [foodCategory, setfoodCategory] = useState([]);

  return (
    <>
      <Navbar />
      <Hero_carousel />
      <Restraunts />
      {/* <Food_category /> */}
      {/* <Food_items/> */}
      <Cta />
      <Footer />
    </>
  );
};

export default Home;

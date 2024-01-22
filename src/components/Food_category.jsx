import React, { useEffect, useState } from "react";
import "../components/styles/Food_category.css";
import Food_items from "./Food_items";
import { useRecoilState } from "recoil";
import { categoryState } from "../store/foodCategory";
import { foodDataState } from "../store/foodItem";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cta from "./Cta";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Hero_carousel from "./Hero_carousel";

const Food_category = () => {
  const [foodCategory, setfoodCategory] = useRecoilState(categoryState);
  const [foodData, setFoodData] = useRecoilState(foodDataState);
  const [currentCategory, setCurrentCategory] = useState("");

  const location = useLocation();

  const qurieParams = new URLSearchParams(location.search);
  const categoryName = qurieParams.get("category");
  const dataName = qurieParams.get("data");
  const restrauntName = qurieParams.get("name").replace("%", " ");

  // localStorage.setItem("resName", restrauntName);

  const handleSubmit = async (e) => {
    // let response = await fetch(`http://localhost:5000/api/fooditems`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization":"Bearer " + localStorage.getItem('token')
    //   },
    // });
    // const data = await response.json();
    const { data } = await axios.post(
      "http://localhost:5000/api/fooditems",
      {
        categoryName: categoryName,
        dataName: dataName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setFoodData(data.foodItems);
    setfoodCategory(data.foodCategory);
    setCurrentCategory(data.foodCategory[0].CategoryName);
  };

  useEffect(() => {
    handleSubmit();
    const encodedData = encodeURIComponent(restrauntName);
    localStorage.setItem("resName", encodedData);
    // localStorage.setItem("resName",restrauntName)
  }, []);

  // const getCurrentCategory=(e)=>{
  //   setCurrentCategory(e.target.value);
  // }
  // console.log(currentCategory);

  return (
    <>
      <Navbar />
      <Hero_carousel />
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "800",
          textAlign: "Center",
          marginBlock: "2rem",
        }}
      >
        {restrauntName}
      </h1>
      <div className="container">
        <div className="food-category-section">
          <ul className="category-list" role="list">
            {foodCategory.length === 0 ? (
              <h1 style={{ color: "red", fontWeight: "600", fontSize: "4rem" }}>
                Server Loading...
              </h1>
            ) : (
              foodCategory.map((data) => {
                return (
                  <li key={data._id}>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setCurrentCategory(e.target.innerHTML)}
                    >
                      {data.CategoryName}
                    </a>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <Food_items
        food_items_data={foodData}
        currentCategory={currentCategory}
      />
      <Cta />
      <Footer />
    </>
  );
};

export default Food_category;

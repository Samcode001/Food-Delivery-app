import React, { useEffect, useState } from "react";
import "../components/styles/Food_category.css";
import Food_items from "./Food_items";

const Food_category = () => {
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Biryani/Rice");

  const handleSubmit = async (e) => {
    let response = await fetch(`http://localhost:5000/api/fooditems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setFoodData(data.foodItems);
    setfoodCategory(data.foodCategory);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  // const getCurrentCategory=(e)=>{
  //   setCurrentCategory(e.target.value);
  // }
  // console.log(currentCategory);

  return (
    <>
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
    </>
  );
};

export default Food_category;

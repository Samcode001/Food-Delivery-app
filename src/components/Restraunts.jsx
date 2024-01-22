import React from "react";
import "../components/styles/Food_items.css";
import "../components/styles/Food_card.css";
import { useNavigate } from "react-router-dom";
const Restraunts = () => {
  // const {searchValue}=useSearchContext();

  const data = [
    {
      name: "Pandit Ji",
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/16462c10698133.574915b628408.jpg",
      CategoryName: "Pandilt_ji_Cetegory",
      DataName: "Pandit_Ji_food_items",
    },
    {
      name: "The Mughals",
      img: "https://media-cdn.tripadvisor.com/media/photo-s/04/b2/aa/1a/restaurant-logo.jpg",
      CategoryName: "food_category",
      DataName: "food_items",
    },
    {
      name: "Cake House",
      img: "https://img.freepik.com/premium-vector/cake-house-logo-template_712580-75.jpg",
      CategoryName: "cake_House_category",
      DataName: "cake_items",
    },
    {
      name: "Agra Cafe",
      img: "https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-coffee-cup-icon-design-letter-b-logo-concept-png-image_4711748.png",
      CategoryName: "coffee_bees",
      DataName: "coffee_bees_items",
    },
    {
      name: "Ashiayana",
      img: "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_100,q_80,fl_lossy,dpr_2.0,c_fit,f_auto,h_100/hp2elcsmv04ivfonnjjc",
      CategoryName: "ashiyana_category",
      DataName: "ashiyana_items",
    },
  ];
  const navigate = useNavigate();
  const handleSubmit = (name, CategoryName, DataName) => {
    let urlName = name.replace(" ", "%");
    navigate(
      `/category?name=${urlName}&category=${CategoryName}&data=${DataName}`
    );
  };

  return (
    <>
      <div className="container">
        <div className="food-items-section">
          {data.map((elem, index) => {
            return (
              <div
                className="food-card"
                key={index}
                style={{
                  width: "clamp(20rem,30vw,30rem)",
                  height: "20rem",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleSubmit(elem.name, elem.CategoryName, elem.DataName)
                }
              >
                <img
                  src={elem.img}
                  alt="Pizza Image"
                  style={{ objectFit: "contain" }}
                />
                <div className="food-card-content">
                  <h2 style={{ fontSize: "2rem", fontWeight: "600" }}>
                    {elem.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Restraunts;

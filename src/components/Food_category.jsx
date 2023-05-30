import React, { useEffect, useState } from 'react';
import './Food_category.css';
import Food_items from './Food_items';

const Food_category = () => {

  const [foodCategory, setfoodCategory] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Biryani/Rice");

  const handleSubmit=async (e)=>{
    let response=await fetch(`https://food-delivery-42zn.onrender.com/api/fooditems`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    });
    response=await response.json();
    setFoodData(response[0]);
    setfoodCategory(response[1]);  
  }

  useEffect(() => {
   handleSubmit();
  }, [])
  
  // const getCurrentCategory=(e)=>{
  //   setCurrentCategory(e.target.value);
  // }
  // console.log(currentCategory);

  return (
    <>
    <div className="container">
      <div className="food-category-section">
            <ul className="category-list" role='list'>
              {foodCategory.map((data)=>{
                return(
                  <li key={data._id}><a style={{cursor:"pointer"}} onClick={(e)=>setCurrentCategory(e.target.innerHTML)}>{data.CategoryName}</a></li>
                )
              })}
            </ul>
      </div>
    </div>
    <Food_items food_items_data={foodData} currentCategory={currentCategory}/>
    </>
  )
}

export default Food_category
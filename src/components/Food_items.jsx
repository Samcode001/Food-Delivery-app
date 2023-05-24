import { useContext } from 'react';
import Food_card from './Food_card';
import './Food_items.css';
import { useSearchContext } from '../context/searchContext';

const Food_items = (props) => {

  const foodData=props.food_items_data;
  const currentCategory=props.currentCategory;
  // const {searchValue}=useSearchContext();


  return (
    <>
    <div className="container">
        <div className="food-items-section">
       {
          foodData.filter((item)=>(item.CategoryName===currentCategory)).map((data)=>{
           return( <Food_card key={data._id}  foodItem={data} options={data.options[0]} />);
          })
       }
        </div>
    </div>

    </>
  )
}

export default Food_items
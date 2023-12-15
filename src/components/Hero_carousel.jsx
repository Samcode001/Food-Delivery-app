import React, { useState ,useReducer} from 'react'
import '../components/styles/Hero_carousel.css';
import Food_items from './Food_items';
import { useSearchContext } from '../context/searchContext';

const Hero_carousel = () => {


  //  const {searchValue,setSearchvalue}=useSearchContext();
//  console.log(searchValue);
  return (
    <>
      <div className="hero-section">
    <div className="container">
      {/* <input type="search" placeholder='Search' onChange={(e)=>setSearchvalue(e.value.target)} /> */}
      {/* <Food_items/> */}
      </div>
    </div>
    </>
  )
}

export default Hero_carousel
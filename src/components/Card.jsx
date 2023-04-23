import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

const Card = (props) => {
  let options=props.options;
  let priceOptions = Object.keys(options); //inbuilt function of javascript dealing with objects

  let dispatch = useDispatchCart();
  let data=useCart();
  let priceRef=useRef(); // the price doenst has its default value so we have to refer it to the size option to take dafault values from there 

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const handleAddToCart = async () => {

    // The below codes is working for the update its check all the parameters 
    let food=[]
    for(const item of data){
      if(item.id===props.foodItem._id){
        food=item;
        break;
      }
    }
    if(food!==[]){
      if(food.size===size){
        await dispatch({type:'UPDATE',id:props.foodItem._id,price:finalPrice,qty:qty})
        return
      }
      else if(food.size !==size){
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size
        })
        return
      }
      return
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    })
  }

let finalPrice=qty*parseInt(options[size]); 
useEffect(()=>{
  setSize(priceRef.current.value) // Setting the finalprice in each render
},[]) 

  return (
    <>
      <div>
        <div className="card mt-3" style={{ "width": " 18rem", "maxHeight": "360px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => { // Makes an array of 6 and retriveing the values
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>
              {/* initializing the value of options or select in the state by onChange Method for myCart  */}
              <select className='m-2 h-100 bg-success rounded ' ref={priceRef}  onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
                {/* <option value="half"></option> */}
              </select>
              <div className="d-inline h-100 fs-5">Rs.{finalPrice}/-</div>
              <hr />
              <button className='btn bg-success text-white' onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
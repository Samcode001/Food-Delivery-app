import React, { useEffect, useRef, useState } from 'react'
import './Food_card.css';
import { useCart, useDispatchCart } from '../context/ContextReducer';
import Add_Notification from './Add_Notification';

const Food_card = (props) => {

  let options = props.options;
  const priceOptions = Object.keys(options);
  let foodItem = props.foodItem;

  let data = useCart();
  let dispatch = useDispatchCart();
  let priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [AddNotification, setAddNotification] = useState(false)


  const handleAddToCart = async () => {

    setAddNotification(true)
    console.log(AddNotification)
    setTimeout(() => {
      setAddNotification(false)
      console.log(AddNotification)
    }, 2000);

    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, img: props.foodItem.img, name: foodItem.name, price: finalPrice, qty: qty, size: size })
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, img: props.foodItem.img, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    

  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value) // Setting the finalprice in each render
  }, [])

  return (
    <>
      <div className="food-card">
        <img src={props.foodItem.img} alt="Pizza Image" />
        <div className="food-card-content">
          <h2>{props.foodItem.name}</h2>
          <div className="options">
            <select className='quantity' onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => [
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ])}
            </select>
            <select className='size' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
          </div>
          <span>Rs {finalPrice}/-</span>
          <hr />
          <div className="btn add-to-cart-btn btn-invert" onClick={handleAddToCart}>Add to Cart</div>
        </div>
      </div>
      {AddNotification === true ? <Add_Notification /> : ""}
    </>
  )
}

export default Food_card
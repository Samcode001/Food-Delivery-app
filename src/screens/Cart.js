import React, { useEffect } from "react";
import "./Cart.css";
import { useCart, useDispatchCart } from "../context/ContextReducer";
import Payment from "../components/payment";
import axios from "axios";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div
          className="cart"
          style={{
            textAlign: "center",
            marginBlock: "3rem",
            color: "#06c167",
            fontSize: "4rem",
          }}
        >
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleRemove = (index) => {
    console.log(index);
    dispatch({ type: "REMOVE", index: index });
  };

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`https://food-delivery-42zn.onrender.com/api/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        restrauntName: localStorage.getItem("resName"),
        order_date: new Date().toDateString(),
        total: totalPrice,
      }),
    });
    if (response.status === 200) {
      // console.log(data);
      dispatch({ type: "DROP" });
    }
  };

  const handlePayment = async (amount) => {
    const {
      data: { key },
    } = await axios.get("https://food-delivery-42zn.onrender.com/getkey");
    const {
      data: { order },
    } = await axios.post("https://food-delivery-42zn.onrender.com/checkout", {
      amount,
    });

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Foodiee Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://food-delivery-42zn.onrender.com/paymentVerification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const res = localStorage.getItem("resName");
  console.log(res);

  return (
    <>
      <div className="container">
        <div className="cart-content">
          <table>
            <thead>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Options</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button className="btn btn-invert" onClick={handleRemove}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h1
              className="fs-2"
              style={{
                fontSize: "1.5rem",
                color: "rgb(201, 68, 68)",
                marginBlock: "2rem",
              }}
            >
              Total Price: {totalPrice}/-
            </h1>
          </div>
          <div>
            <button
              className="btn btn-invert"
              onClick={() => {
                handleCheckOut();
                handlePayment(totalPrice);
              }}
            >
              {" "}
              Check Out{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

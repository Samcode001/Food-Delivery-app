import React from 'react'
import './Cart.css'
import { useCart, useDispatchCart } from '../context/ContextReducer';
import Payment from '../components/payment';

const Cart = () => {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div >
                <div className='cart' style={{textAlign:'center',marginBlock:'3rem',color:'#06c167',fontSize:'4rem'}}>The Cart is Empty!</div>
            </div>
        )
    }

    const handleRemove = (index) => {
        console.log(index)
        dispatch({ type: "REMOVE", index: index })
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem('userEmail')
        let response = await fetch(`http://localhost:5000/api/orderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString(),
                total:totalPrice
            })
        });
        // <Payment/>
        if (response.status === 200) {
            // console.log(data);
            dispatch({ type: 'DROP' });
        }

    }


    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <>
            <div className="container">
                <div className="cart-content">
                    <table>
                        <thead>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Options</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </thead>
                        <tbody>
                            {data.map((food, index) => (
                                <tr>
                                    <th scope='row' >{index + 1}</th>
                                    <td >{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button className='btn btn-invert' onClick={handleRemove}>Remove</button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div><h1 className='fs-2' style={{fontSize:'1.5rem',color:'rgb(201, 68, 68)',marginBlock:'2rem'}}>Total Price: {totalPrice}/-</h1></div>
                    <div>
                        <button className='btn btn-invert' onClick={handleCheckOut}  > Check Out </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Cart
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import './Myorder.css'

const MyOrder = () => {

    const [orderData, setOrderData] = useState("");
    const fetchMyOrder = async () => {
        await fetch("https://food-delivery-42zn.onrender.com/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            // console.log(response);
            await setOrderData(response);
        });
    }

    useEffect(() => {
        fetchMyOrder();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                {orderData !== {} ? Array(orderData).map(data => {
                    return (
                        data.orderData ?
                            data.orderData.order_data.slice(0).reverse().map((item) => {
                                return (

                                    Array.from(item).map((arrayData) => {
                                        return (
                                            <div className='myorder-content'>
                                                {arrayData.order_date ? <div className='m-auto mt-5' id='order-date' >

                                                    {data = arrayData.order_date}
                                                    <hr />
                                                </div> :


                                                    <div className='col-12 col-md-6 col-lg-3' >
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "80px", objectFit: "cover", aspectRatio: "1" }} />

                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <span className='m-1'><span style={{ display: "inline-block" }}>Qty</span>{arrayData.qty}</span>
                                                            <span className='m-1'><span style={{ display: "inline-block" }}>Size</span>{arrayData.size}</span>
                                                            <span className='m-1' >
                                                                <span style={{ display: "inline-block" }}>Price</span> ₹{arrayData.price}/-
                                                            </span>
                                                        </div>

                                                    </div>



                                                }

                                            </div>
                                        )
                                    })

                                )
                            }) : <div style={{ textAlign: 'center', fontSize: '4rem', color: "#06c167" }}>No orders</div>
                    )
                }) : <div style={{ textAlign: 'center', fontSize: '4rem', color: "#06c167" }}>No orders</div>}
            </div>

            <Footer />
        </>
    )
}

export default MyOrder
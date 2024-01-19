import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Cta from './Cta'
import confirmationLogo from '../assets/icons8-approval.gif'

const OrderSuccess = () => {

  return (
    <div>
        <Navbar/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",paddingBlock:"12rem"}}>
        <img src={confirmationLogo} alt="" width={100}/>
        <h1 style={{fontSize:"3rem",fontWeight:"600"}}>Order Confirmed</h1>
        {/* <p>Reference:</p> */}
      </div>
        <Cta/>
        <Footer/>
    </div>
  )
}

export default OrderSuccess
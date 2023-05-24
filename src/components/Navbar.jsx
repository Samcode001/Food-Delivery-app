import React, { useState } from 'react'
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Cart from '../screens/Cart';

const Navbar = () => {
   
  const [cartView, setCartView] = useState(false);

    const navigate=useNavigate();
    const authToken=localStorage.getItem("authToken");
    // console.log(authToken)

    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        navigate("/login");
    }

    return (
        <>
            <header className='primary-header'>
                <div className="container">
                    <div className="nav-wrapper">
                        <div className="left-nav flex">
                            <Link to='/' className="primary-logo"><span>F<span className='invert'>OO</span>DIEE</span></Link>
                            <nav className='display-sm-none'>
                               
                                {authToken? <ul className="primary-navigation flex">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/myorder">My Orders</Link></li>
                                </ul>:""}
                            </nav>
                        </div>
                        <button style={{ display: "none" }} className='mobile-nav-toggle'><span className='visually-hidden'>Hamburger Menu</span></button>
                        <div className='right-nav'>
                           
                            {authToken? <ul className="nav-button-area flex">
                                <div className="display-md-none">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/myorder">My Orders</Link></li>
                                </div>
                                <button className='btn'><Link to='#' className='login-btn'><div onClick={()=>setCartView(true)} >My cart</div></Link></button>
                                {cartView?<Modal onClose={()=>setCartView(false)} > <Cart/></Modal>:null}
                                <button className='btn'><Link to='/login' onClick={handleLogout} className='signup-btn'>Logout</Link></button>
                            </ul>: <ul className="nav-button-area flex">
                                <div className="display-md-none">
                                    <li><Link to="/">Home</Link></li>
                                    <li><a href="#">My Orders</a></li>
                                </div>
                                <button className='btn'><Link to='/login' className='login-btn'>Login</Link></button>
                                <button className='btn'><Link to='/signup' className='signup-btn'>Sign Up</Link></button>
                            </ul>}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Model from './Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {

  const [cartView, setCartView] = useState(false);

  let data=useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Foo<span className="danger">di</span>ee</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto mb-1">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              {(localStorage.getItem("authToken")) ?
                <div className="nav-link active fs-5">My Orders</div>
                : ""
              }
            </div>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUP</Link>
              </div>
              :
              <div>
                <div className="btn bg-white text-success mx-1" onClick={()=>setCartView(true)}>My cart{"  "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>
                {cartView ? <Model onClose={() => setCartView(false)}><Cart /></Model> : null}
                <div className="btn bg-white text-danger mx-1" onClick={handleLogout} >Logout</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
import React, { useEffect, useState } from "react";
import "../components/styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Cart from "../screens/Cart";
import { useCart } from "../context/ContextReducer";
import axios from "axios";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const [user, setUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let data = useCart();

  const navigate = useNavigate();
  //   const authToken = localStorage.getItem("authToken");
  // console.log(authToken)

  // const getUser = async () => {
  //   const res = await axios.get("https://food-delivery-42zn.onrender.com/api/me", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });
  //   if (res.status === 200) {
  //   }
  // };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  useEffect(() => {
    // getUser();
    const user = localStorage.getItem("userEmail");
    if (user) setUser(true);
  }, []);

  return (
    <>
      <header className="primary-header">
        <div className="container">
          <div className="nav-wrapper">
            <div className="left-nav flex">
              <Link to="/" className="primary-logo">
                <span>
                  F<span className="invert">OO</span>DIEE
                </span>
              </Link>
              <nav className="display-sm-none">
                {user ? (
                  <ul className="primary-navigation flex">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/myorder">My Orders</Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </nav>
              <div className="hamburger-menu-container">
                <div
                  className={`hamburger ${isOpen ? "open" : ""}`}
                  onClick={handleToggle}
                >
                  {console.log(isOpen)}
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
            </div>
            <div
              className="right-nav"
              style={
                isOpen
                  ? { inset: "0rem 0rem 0rem 12rem" }
                  : { inset: "0rem 0rem 0rem 120rem" }
              }
            >
              {user ? (
                <ul className="nav-button-area flex">
                  <div className="display-md-none">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/myorder">My Orders</Link>
                    </li>
                  </div>
                  <button className="btn">
                    <div onClick={() => setCartView(true)}>
                      My cart
                      <span
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginInlineStart: "6px",
                          borderRadius: "100%",
                          fontSize: "14px",
                          padding: "3px",
                        }}
                      >
                        {data.length}
                      </span>
                    </div>
                    <Link to="#" className="login-btn"></Link>
                  </button>
                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      {" "}
                      <Cart />
                    </Modal>
                  ) : null}
                  <button className="btn">
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="signup-btn"
                    >
                      Logout
                    </Link>
                  </button>
                </ul>
              ) : (
                <ul className="nav-button-area flex">
                  <div className="display-md-none">
                    {/* <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <a href="#">My Orders</a>
                    </li> */}
                  </div>
                  <button className="btn">
                    <Link to="/login" className="login-btn">
                      Login
                    </Link>
                  </button>
                  <button className="btn">
                    <Link to="/signup" className="signup-btn">
                      Sign Up
                    </Link>
                  </button>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

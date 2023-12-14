import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [invalidcredentials, setinvalidcredentials] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();
    if (data.status === 200) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    } else {
      return setinvalidcredentials(true);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login-content">
        <div className="container">
          <div className="split">
            <div className="content-side">
              <h1>We Deliver Happiness.</h1>
            </div>
            <div className="form-side">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Username"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                <div className="flex-column" style={{ gap: "0.2rem" }}>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                  {/* {invalidcredentials ? <span>Username or password Invalid</span> : <span>Password must be 8 charcters.</span>} */}
                </div>
                <div className="button-area">
                  <button className="btn btn-invert" type="submit">
                    Submit
                  </button>
                  <button className="btn btn-invert">
                    <Link to="/signup" className="shift-link">
                      Create New Account
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

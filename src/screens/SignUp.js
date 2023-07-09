import React, { useState } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  let navigate=useNavigate();

  const [credentials, setCredentials] = useState({
    name:"",
    email:"",
    password:"",
    geoLocation:""
  });

  const [userExist, setUserExist] = useState(false);

  const handleSubmit=async(e)=>{
   e.preventDefault(); 
    let response=await fetch("https://food-delivery-42zn.onrender.com/api/createUser",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        name:credentials.name,
        email:credentials.email,
        password:credentials.password,
        location:credentials.geoLocation
      })

    });
 
    let json=await response.json();
    // console.log(json);

    if(json.error==="User already exist"){
      return setUserExist(true);
    }

    if(!json.sucess){
      return alert("Enter Valid Credentials");
    }

      navigate('/login');

  }

  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  return (
    <>
    <div className="login-content">
        <div className="container">
            <div className="split">
          <div className='content-side'>
            <h1>We Deliver Happiness.</h1>
          </div>
           <div className="form-side">
               <form onSubmit={handleSubmit}>
                <input type="text" name='name' value={credentials.name} placeholder='Name' onChange={handleChange} />
                <input type="email" name='email' value={credentials.email} placeholder='Username' onChange={handleChange} />
                <div className='flex-column' style={{gap:"0.2rem"}}>
                    <input type="password" name='password' value={credentials.password} placeholder='Password' onChange={handleChange}/>
                  { userExist? <span>User already exist.</span> : <span>Password must be 8 charcters.</span>}
                </div>
                <input type="text" name='geoLocation' value={credentials.geoLocation} placeholder='location' onChange={handleChange} />
                <div className="button-area">
                    <button className="btn btn-invert" type='submit'>Create Account</button>
                    <button className="btn btn-invert"><Link to='/login' className='shift-link'>Already a User</Link></button>
                </div>
               </form>
           </div>
            </div>
        </div>
    </div>
    </>

  )
}

export default SignUp
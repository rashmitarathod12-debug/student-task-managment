import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

//declaration section
  const [formdata,setFormdata]= useState({
    name:"",
    email:"",
    password:"",
    phone:"",
  });
  const [errors,setErrors] = useState({})
  const navigate = useNavigate()

  //logic section
  const handleInputChange = (e) =>{
     //console.log(e.target.name,e.target.value)
     setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
     })
     setErrors({
      ...errors,
      [e.target.name]: ""
     })
  };

// useEffect(()=>{
//   console.log(formdata)
// },[formdata])

const handleSubmit = (e)=>{
  e.preventDefault();
  if(validate()){
    localStorage.setItem("authData",JSON.stringify(formdata));
    alert("registration successful...!")
    navigate("/login");
  //console.log("formdata")
  }
}
const validate = () =>{
  const newError ={}
  if(!formdata.name.trim()){
    newError.name = "Full name is required."
  }
  else if(formdata.name.length <=3){
    newError.name = "minimum 3 character required."
  }

  if (!formdata.email.trim()){
  newError.email = "Email is required."
  }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)){
    newError.email = "Invalid format."
  }

  if (!formdata.phone.trim()){
  newError.phone = "phone number is required."
  }
  else if(!/^[0-9]{10}$/.test(formdata.phone)){
    newError.phone = "phone must be in 10 digit."
  }

  if (!formdata.password.trim()){
  newError.password = "password is required."
  }
  else if(formdata.password.length < 6){
    newError.password = "minimum 6 character required."
  }
  setErrors(newError)
  //console.log(typeof newError)
  return Object.keys(newError).length === 0;
}

  //design section
  return (
    <div className="form-container">
      <h1 className="form-title">REGISTER</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formdata.name}
            placeholder="Enter your full name"
            onChange={handleInputChange}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formdata.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formdata.phone}
            placeholder="Enter your phone number"
            onChange={handleInputChange}
            />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formdata.password}
            placeholder="Create a password"
            onChange={handleInputChange}
          />
          {errors.password && <span className="error-msg">{errors.password}</span>}

        </div>

        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;

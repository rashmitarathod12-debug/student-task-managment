import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { useState } from 'react';

const Login = () => {
const [logindata,setLogindata] = useState({
  email:"",
  password:"",
})
const [errors,setErrors] = useState({})
const navigate = useNavigate();

const handleInputChange = (e) =>{
  //console.log(e.target.name,e.target.value)
  setLogindata({
  ...logindata,
  [e.target.name]: e.target.value,
  });
setErrors({
  ...errors,
  [e.target.name]: ""
})
};

const handleClick = (e) =>{
  e.preventDefault();
  if(validate()){
    const user = JSON.parse(localStorage.getItem("authData"));
    if (user &&
       logindata.email === user.email &&
       logindata.password === user.password){
    localStorage.setItem("logindata",JSON.stringify(logindata));
    navigate("/dashboard");
    }
    else{
          alert("Invalid email or password"); 
    }
  }
  else{
        alert("something went wrong!");
  }
};
const validate = () =>{
  const newError={}
  if(!logindata.email.trim()){
    newError.email = "email is required."
  }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logindata.email)){
    newError.email = "Invalid format."
  }
  if (!logindata.password.trim()){
  newError.password = "password is required."
  }
  else if(logindata.password.length < 6){
    newError.password = "minimum 6 character required."
  }
setErrors(newError)
  return Object.keys(newError).length === 0;
}

  return (
    <div className="form-container">
      <h1 className='form-title'>welcome back</h1>
      <form onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={logindata.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={logindata.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
          {errors.password && <span className="error-msg">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <p className="link-text">
        Don't have an account?<Link to="/Register">register here</Link>
      </p>

    </div>
  );
};
export default Login;

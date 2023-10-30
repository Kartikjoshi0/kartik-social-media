import React, { useState } from 'react'
import './Login.scss'
import {Link, useNavigate} from 'react-router-dom'
import {axiosClient} from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStoragerManager';

function Login() {

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
 const navigate=useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    
    try {
      const response=axiosClient.post('/auth/login',{
        email,
        password
      });

      console.log("response is generated",response);
      setItem(KEY_ACCESS_TOKEN,response.result.accessToken);
      navigate('/');
      console.log("navigated to home");
    } catch (error) {
      console.log("here is my error",error);
    }
    
    
  }

  return <div className='login'>
    <div className='login-box'>
        <h2 className='heading'>Login</h2>
        <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input type="text" className='email' id='email' onChange={(e)=> setEmail(e.target.value)}/>


            <label htmlFor="password">Password</label>
            <input type="text" className='password' id='password' onChange={(e)=> setPassword(e.target.value)}/>

            <input type="submit"  className='submit'  />
        </form>
        <p className='subheading'>Do not have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  </div>
}

export default Login
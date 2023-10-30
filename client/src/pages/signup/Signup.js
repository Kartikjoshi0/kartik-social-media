import React, { useState } from 'react'
import './Signup.scss'
import {Link,useNavigate} from 'react-router-dom'
import {axiosClient} from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN ,setItem} from '../../utils/localStoragerManager';


function Signup() {
    const[name,setName]=useState("")
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();
  
  
    async function handleSubmit(e){
      e.preventDefault();
      try {
        const result=axiosClient.post('/auth/signup',{
          name,
          email,
          password
        });
        setItem(KEY_ACCESS_TOKEN,result.result.accessToken);
  
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }





    return <div className='Signup'>
    <div className='signup-box'>
        <h2 className='heading'>Signup</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" className='name' id='name' onChange={(e)=>setName(e.target.value)}/>


            <label htmlFor="email">Email</label>
            <input type="text" className='email' id='email'  onChange={(e)=>setEmail(e.target.value)}/>


            <label htmlFor="password">Password</label>
            <input type="text" className='password' id='password' onChange={(e)=>setPassword(e.target.value)} />

            <input type="submit"  className='submit'/>
        </form>
        <p className='subheading'>ALready have an account? <Link to="/login">Login</Link></p>
    </div>
  </div>
}

export default Signup
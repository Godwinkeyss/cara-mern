import { useState,useEffect, useContext } from 'react';
import {Store} from '../Store'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
const SigninScreen = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
 const {state,dispatch:ctxDispatch} = useContext(Store)
 const {userInfo}=state

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

   
    const {data} = await axios.post('http://127.0.0.1:5000/api/auth/signin',{
      email,
      password
    })
    ctxDispatch({type: 'USER_SIGNIN', payload:data})
    localStorage.setItem('userInfo', JSON.stringify(data))
    navigate(redirect || '/');
  }catch(error){
    toast.error(getError(error));
  }
  };
  useEffect(()=>{
    if(userInfo) {
      navigate(redirect);
    }
  },[navigate, redirect, userInfo])
  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <h1>Signin</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Signin</button>
          <p>
            New to our website? <Link to="/signup">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;

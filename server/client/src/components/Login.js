import React, {useState, useContext} from 'react'
import {NavLink, useHistory } from "react-router-dom";

import {userContext} from '../App';

const Login = () => {

  const {state, dispatch} = useContext(userContext);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginPost = async (e) => {
      e.preventDefault();

      const res = await fetch('/signin', {
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          }, 
          body:JSON.stringify({
            email,
            password
          })
      });

      const data = res.json();

      if(res.status === 400 || !data){
          window.alert("login error");
      } else{
        dispatch({type:"USER", payload:true})
        window.alert("login Succesfully");
        history.push('/');
      }

  }

  return(
    <>
      <section className="sign-in mt-5">
        <div className="sign-in-form">
          <h2>Login</h2>
          <form method="POST" className="signin-form" id="signin-form">
                <div className="form-group">
                    <label htmlFor="email">
                        <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input type="text" name="email" id="email" autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        <i className="zmdi zmdi-lock material-icons-name"></i>
                    </label>
                    <input type="password" name="password" id="password" autoComplete="off" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password" />
                </div>

                <div className="form-group form-button">
                    <input type="button" name="signin" id="signin" className="form-submit btn-primary" onClick={loginPost} value="Log In" />
                </div>
          </form>
              <div>
                <NavLink to="/signup" className="signup-image-link">Create account</NavLink>
             </div>
        </div>
      </section>
    </>
  )
}

export default Login
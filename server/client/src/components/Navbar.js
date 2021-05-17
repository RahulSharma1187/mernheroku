import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Logo from '../image/logo.png'
import {NavLink } from "react-router-dom";

import { userContext } from '../App';

const Navbar = () => {

  const {state, dispatch} = useContext(userContext);

  const ReanderMenu = () => {
    if(state){
      return(
        <>
        <li className="nav-item active">
          <NavLink className="nav-link" to="/">Home </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
        </>
      )
    } else{
      return(
        <>
        <li className="nav-item active">
          <NavLink className="nav-link" to="/">Home </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Registration</NavLink>
        </li>
        </>
      )
    }
  }

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/">
      <img src={Logo} alt="Logo" />
  </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <ReanderMenu/>
    </ul>
    
  </div>
</nav>
    </>
  )
}

export default Navbar
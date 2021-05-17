import React, {createContext, useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../src/App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Errorpage from './components/Errorpage'
import Logout from './components/Logout'

import { Route, Switch } from "react-router-dom";

import {initialState, reducer} from "../src/reducer/UseReducer"

//1. contextAPI
export const userContext = createContext();

const Routing = () => {
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/About">
        <About />
      </Route>
      <Route path="/Contact">
        <Contact />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      <Route path="/Signup">
        <Signup />
      </Route>
      <Route path="/Logout">
        <Logout />
      </Route>
      <Route>
        <Errorpage />
      </Route>
    </Switch>
  )
}

const App = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <>

      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </userContext.Provider>
      
    </>
  )
}

export default App
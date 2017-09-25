import React, { Component } from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Admin from './components/Admin/Admin.js';
import UserHome from './components/User/User.js';
import './styles/index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Redirect} from 'react-router-dom';

render(
  <MuiThemeProvider>
    <Router>
     <div className = "App">
       <Route exact path = '/' component = {Login}/>

  <Route path = '/adminhome'
       render={()=>{
          const username = localStorage.getItem('username');
          if(username) return <Admin/>
          else return <Login/>
       }} />
       <Route
             path = '/userhome'
             render={ () => localStorage.getItem('username') ? <UserHome /> : <Redirect to='/' />}
       />
      
       <Route path = '/signup' component = {Signup}/>
     </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);

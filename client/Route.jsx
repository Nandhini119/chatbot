import React, { Component } from 'react';
import render from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Admin from './components/Admin/Admin.js';
import UserHome from './components/User/User.js';
import './styles/index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render(
  <MuiThemeProvider>
    <Router>
     <div className = "App">
       <Route exact path = '/' component = {Login}/>
       <Route path = '/adminhome' component = {Admin}/>
       <Route path = '/userhome' component = {UserHome}/>
       <Route path = '/signup' component = {Signup}/>
     </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);

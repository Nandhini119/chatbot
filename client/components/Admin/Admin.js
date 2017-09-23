import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Glyphicon} from 'react-bootstrap';
import {Avatar} from 'material-ui';
import './Admin.css';

import UnAnsweredComp from './UnAnswered.js';
import AllQuestionsComp from './AllQuestions.js';
import AllUsersComp from './AllUsers.js';
import Home from './Home.js';

const styles = {
  appbar : {
    backgroundColor : "black",
  },
  title : {
    color : "white",

  },
}

export default class Admin extends React.Component{

constructor(props) {
  super(props);
  this.state = {
    component: " ",
    logout: false
  }
  this.setComponent = this.setComponent.bind(this);
  this.getComponent = this.getComponent.bind(this);
  this.nullifyComponent = this.nullifyComponent.bind(this);
  this.logout = this.logout.bind(this);
}

setComponent(comp) {
  this.setState({component : comp.comp});
}

/*to render different component switch case is used*/
getComponent() {
  switch(this.state.component){
    case "unanswered" :
      return <UnAnsweredComp nullifyComponent = {this.nullifyComponent}/>;
    case "allquestions" :
      return <AllQuestionsComp nullifyComponent = {this.nullifyComponent}/>;
    case "allusers" :
      return <AllUsersComp nullifyComponent = {this.nullifyComponent}/>;
    default :
      return <Home setComponent = {this.setComponent}/>
  }
}

nullifyComponent() {
  this.setState({component : ""});
}
logout() {
  let self= this;
  superagent
  .get('/users/logout')
  .end(function(err,data){
    if(res.body.message === 'error in logout') {
      console.log("error in logout");
    } else {
      self.setState({
        logout: res.body.status == "success"
      });
    }
  });
}

  render() {
    return(
      <div className = "backgroundimage">
        <div>
          <nav className="navbar navbar-inverse " style = {styles.appbar}>
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" style = {styles.title} href="#">
                <span><img src='./../../assets/images/Logo.png' className = " logo responsive" alt = "Logo"/></span> Quora</a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#" style = {styles.title}><span><Avatar  color = "white" size = {30} backgroundColor = "gray">A</Avatar></span> Admin</a></li>
                  <li ><a href="#"><span><Glyphicon glyph="log-out" className = "logout" style = {styles.title} onClick={this.logout}></Glyphicon></span></a></li>
                </ul>
              </div>
              {this.state.logout ? <Redirect to='/' push={false} /> : ''}
            </div>
          </nav>

          {this.getComponent()}

          </div>

      </div>
    );
  }
}

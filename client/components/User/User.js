import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Glyphicon,Badge} from 'react-bootstrap';
import {Avatar} from 'material-ui';
import  './User.css';

const styles = {
  appbar : {
    backgroundColor : "black",
  },
  title : {
    color : "white",

  },
}

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
    this.logout = this.logout.bind(this);
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
                <span><img src ='../../assets/images/Logo.png' className = " logo responsive" alt = "Logo"/></span> Quora</a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#"><span><Glyphicon glyph="bell" className = "notification" style = {styles.title}></Glyphicon></span></a></li>
                  <li><a href="#" style = {styles.title}><span><Avatar  color = "white" size = {30} backgroundColor = "purple">A</Avatar></span> User</a></li>
                  <li ><a href="#"><span><Glyphicon glyph="log-out" className = "logout" style = {styles.title} onClick={this.logout}></Glyphicon></span></a></li>
                </ul>
              </div>
              {this.state.logout ? <Redirect to='/' push={false} /> : ''}
            </div>
          </nav>
          </div>
      </div>
    );
  }
}

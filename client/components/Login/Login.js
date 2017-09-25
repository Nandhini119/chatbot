import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Row,Col} from 'react-flexbox-grid';
import {Paper,FlatButton,RaisedButton,TextField} from 'material-ui';
import {Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
import Accountcircle from 'material-ui/svg-icons/action/perm-identity';
import Password from 'material-ui/svg-icons/action/lock-outline';
import superagent from 'superagent';
import './Login.css';

const styles = {
  paperstyle : {
    height: '100%',
    width: 380,
    marginTop: 100,
    textAlign: 'center',
    display: 'inline-block',
  },
  svgstyle : {
    marginRight:10
  },
  /* textfieldstyle : {
    marginTop:50
  }, */
  buttonstyle : {
    margin: 12,
    width:300,
  }

}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      currentUser: 'none'
    }
    this.onLogin = this.onLogin.bind(this);
    this.validationSuccess = this.validationSuccess.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      usernameError: '',
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      passwordError: '',
      password: event.target.value
    });
  }

  onLogin() {
    let self = this;
    if(this.validationSuccess()) {
      superagent
      .post('/users/login')
      .send({username: self.state.username, password: self.state.password})
      .end(function(err, res) {
        if(err) {
          console.log(res)
          if(res.body.message === 'Invalid User') alert('Invalid User!');
          else alert('Server Error! Try after some time.');
        } else {
          self.setState({currentUser: res.body.user.type});
        }
      });
    }
  }

  validationSuccess() {
    if(this.state.username.trim().length == 0) {
      this.setState({
        usernameError: "Username cannot be empty"
      });
    } else if(this.state.password.trim().length == 0) {
      this.setState({
        passwordError:"Password cannot be empty"
      });
    } else {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="bgimg">
        <div className="container-fluid ">
          <Row center="xs" end = "sm">
          <Col xs={11} sm={5}>
          <Paper style={styles.paperstyle} zDepth={3} >
            <h3>Login Here!!</h3>

              <TextField
            /*  icon={  <svg xmlns="http://www.w3.org/2000/svg" style={styles.svgstyle} width="24" height="24" viewBox="0 0 18 18"><path d="M9 1C4.58 1 1 4.58 1 9s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.75c1.24 0 2.25 1.01 2.25 2.25S10.24 8.25 9 8.25 6.75 7.24 6.75 6 7.76 3.75 9 3.75zM9 14.5c-1.86 0-3.49-.92-4.49-2.33C4.62 10.72 7.53 10 9 10c1.47 0 4.38.72 4.49 2.17-1 1.41-2.63 2.33-4.49 2.33z"/></svg>
}*/
                //style={styles.textfieldstyle}
                hintText="Username"
                value={this.state.username}
                errorText={this.state.usernameError}
                floatingLabelText={<Accountcircle/>}
                onChange={this.onUsernameChange} /><br/>

              <TextField
               hintText="Password"
               type="password"
               value={this.state.password}
               errorText={this.state.passwordError}
               floatingLabelText={<Password/>}
               onChange={this.onPasswordChange} /><br />

            <RaisedButton label="Log In" primary={true} style={styles.buttonstyle} onClick = {this.onLogin} />
            <RaisedButton label="LogIn using Google" secondary={true} style={styles.buttonstyle} />
            <p>New User?<Link to = '/signup'>
            <FlatButton label="Register Here" primary={true} /></Link></p>
            </Paper>
            </Col>
          </Row>
          {
            this.state.currentUser === 'user' ? <Redirect to='/userhome' push="{false}" /> :
            this.state.currentUser === 'admin' ? <Redirect to='/adminhome' push /> :''
          }
          </div>
      </div>
    );
  }
}

export default Login;

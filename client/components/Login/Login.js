import React, {
    Component
} from 'react';
import {
    Row,
    Col
} from 'react-flexbox-grid';
import {
    Paper,
    FlatButton,
    RaisedButton,
    TextField
} from 'material-ui';
import {
    Link,
    Redirect
} from 'react-router-dom';
import $ from 'jquery';
import Accountcircle from 'material-ui/svg-icons/action/perm-identity';
import Password from 'material-ui/svg-icons/action/lock-outline';
import superagent from 'superagent';
import './Login.css';

const styles = {
    paperstyle: {
        height: '100%',
        width: 380,
        marginTop: 100,
        textAlign: 'center',
        display: 'inline-block',
    },
    svgstyle: {
        marginRight: 10
    },
    buttonstyle: {
        margin: 12,
        width: 300,
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
            currentUser: 'none',
            status: " ",
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
        if (this.validationSuccess()) {
            superagent
                .post('/users/login')
                .send({
                    username: self.state.username,
                    password: self.state.password
                })
                .end(function(err, res) {
                    if (err) {
                        if (res.body.message === 'Invalid User') alert('Invalid User!');
                        else alert('Server Error! Try after some time.');
                    } else {
                        self.setState({
                            currentUser: res.body.user.type
                        });
                        if (res.body.user.status == "blocked") {
                            alert("you have been blocked");
                        } else {
                            // set username to localstorage to protect client routes after logout
                            localStorage.setItem('username', res.body.user.username);
                        }
                    }
                });
        }
    }

    validationSuccess() {
        if (this.state.username.trim().length == 0) {
            this.setState({
                usernameError: "Username cannot be empty"
            });
        } else if (this.state.password.trim().length == 0) {
            this.setState({
                passwordError: "Password cannot be empty"
            });
        } else {
            return true;
        }
        return false;
    }
  render() {
    return (
      <div>
        <div className="container-fluid ">
          <Row center="xs" end = "sm">
            <Col xs={11} sm={5}>
              <Paper style={styles.paperstyle} zDepth={3} >
                <h4>Login Here!!</h4>
                <TextField
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
          {  this.state.currentUser === 'user' ? <Redirect to='/userhome' push={false} /> :
            this.state.currentUser === 'admin' ? <Redirect to='/adminhome' push={false} /> :''}
      </div>
    </div>
    );
  }
}

export default Login;

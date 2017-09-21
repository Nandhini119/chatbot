import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Row,Col} from 'react-flexbox-grid';
import {Paper,FlatButton,RaisedButton,TextField} from 'material-ui';
import Accountcircle from 'material-ui/svg-icons/action/perm-identity';
import Password from 'material-ui/svg-icons/action/lock-outline';
import Email from 'material-ui/svg-icons/communication/mail-outline';
import {Link, Redirect} from 'react-router-dom';
import superagent from 'superagent';
import './Signup.css';


const styles = {
        paper : {
              height: '100%',
              width: 380,
              marginTop: 100,
              textAlign: 'center',
              display: 'inline-block',
            },
      /*  textfieldstyle : {
          marginTop:50

        },*/
        buttonstyle : {
          margin: 12,
          width:300,
        },
        svgstyle : {
          marginRight:10
        }
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      usernameError:'',
      email:'',
      emailError:'',
      password:'',
      passwordError:'',
      signupflag : false
    }
    this.handleSignup = this.handleSignup.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    this.validationSuccess = this.validationSuccess.bind(this);
  }
  onUsernameChange(event){
    var uname = event.target.value;
    this.setState({usernameError:'',
                    username:uname});

  }
  onEmailChange(event){
    var mail=event.target.value;
    this.setState({
      emailError:'',
      email:mail
    });
  }
  onPasswordChange(event){
    var password = event.target.value;
    this.setState({
      passwordError:'',
      password:password

    });
  }
  onConfirmpasswordChange(event){
    var cpassword = event.target.value;
    this.setState({
      confirmpasswordError:'',
      confirmpassword:cpassword

    });
  }

  // Validating textfields
    validationSuccess() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(this.state.username.length == 0) {
        this.setState({
          usernameError:"Username cannot be empty"
        });

      }
      else if (!(this.state.email.match(mailformat))){
        this.setState({
              emailError:"email is not valid"
              })
            }

      else if(this.state.password.length == 0) {
        this.setState({
          passwordError:"Password cannot be empty"
        });
      }


        else{
          return true;
        }
        return false;
      }

  handleSignup()
  {
if(this.validationSuccess()){
   let self=this;
    superagent
        .post('/users/signup')
        .send({username:self.state.username,email:self.state.email,password:self.state.password})
        .end(function(err,res){
        if(err){
            console.log('error: ', err)
        }
        else {
            let status = res.body.status;
            if(status === 'signup success') {
                self.setState({
                    signupflag:true
                });
                 console.log('signup success');
            }
            else if(status === 'username already exsist'){
              self.setState({
                   usernameError:'username already exsists'
              });
          }
          else {
              console.log('signup failed');
          }
          }
  });
}
}
  render() {
    return (

  <div className="bgimg">
  <div  className="container-fluid ">
          <Row center="xs" end = 'sm'>
            <Col xs={11} sm={5}>
            <Paper style={styles.paper} zDepth={3} >
<h3>Register Here!!!</h3>
                <TextField
              //  style={styles.textfieldstyle}
                hintText="Username"
                value={this.state.username}
                errorText={this.state.usernameError}
                floatingLabelText="Username"
                floatingLabelText={<Accountcircle/>}
                onChange={this.onUsernameChange}/><br/>

              <TextField
                hintText="Email"
                value={this.state.email}
                errorText={this.state.emailError}
                floatingLabelText="Email"
                floatingLabelText={<Email/>}
                onChange={this.onEmailChange}/><br />

              <TextField
               hintText="Password"
               value={this.state.password}
               errorText={this.state.passwordError}
              floatingLabelText="Password"
              floatingLabelText={<Password/>}
              onChange={this.onPasswordChange}/><br />

              <RaisedButton label="REGISTER NOW" primary={true} style={styles.buttonstyle} onClick = {this.handleSignup}/>
              <p>Already have an account?<Link to ='/'><FlatButton label="Login" primary={true} /></Link></p>
            </Paper>
            </Col>
          </Row>
          {this.state.signupflag ?  < Redirect to = '/adminhome' > < /Redirect>:''}
          </div>
          </div>


    );
  }
}

export default Signup;

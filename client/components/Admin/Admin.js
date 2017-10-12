import React from 'react';
import {
    Glyphicon
} from 'react-bootstrap';
import {
    Avatar
} from 'material-ui';
import {
    Redirect
} from 'react-router-dom';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';
import Logo from '../../assets/images/Logo.png';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import superagent from 'superagent';
import UnAnsweredComp from './UnAnswered.js';
import AllQuestionsComp from './AllQuestions.js';
import AllUsersComp from './AllUsers.js';
import Home from './Home.js';
import NewQuestions from './newQuestions.js';
import './Admin.css';

const styles = {
    title: {
        color: "white",
    },
    toolbarStyle: {
        backgroundColor: "#3B3B3A",
        height: "7%",
    },
    account: {
        height: "50px",
        width: "40px",
    }
}

export default class Admin extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                    component: " ",
                    logout: false,
                }
                this.setComponent = this.setComponent.bind(this);
                this.getComponent = this.getComponent.bind(this);
                this.nullifyComponent = this.nullifyComponent.bind(this);
                this.logout = this.logout.bind(this);
            }
            /*to set component name in state for conditional rendering*/
        setComponent(comp) {
            this.setState({
                component: comp.comp
            });
        }

        /*to render different component based on actions to be performed*/
        getComponent() {
                switch (this.state.component) {
                    case "unanswered":
                        return <UnAnsweredComp nullifyComponent = {
                            this.nullifyComponent
                        }
                        />;
                    case "allquestions":
                        return <AllQuestionsComp nullifyComponent = {
                            this.nullifyComponent
                        }
                        />;
                    case "allusers":
                        return <AllUsersComp nullifyComponent = {
                            this.nullifyComponent
                        }
                        />;
                    case "newquestions":
                        return <NewQuestions nullifyComponent = {
                            this.nullifyComponent
                        }
                        />;
                    default:
                        return <Home setComponent = {
                            this.setComponent
                        }
                        />
                }
            }
            /*to remove component in state when back is clicked*/
        nullifyComponent() {
                this.setState({
                    component: ""
                });
            }
            /*handling logout*/
        logout() {
            let self = this;
            superagent
                .get('/users/logout')
                .end(function(err, res) {
                    if (res.body.message === 'error in logout') {
                        console.log("error in logout");
                    } else if (res.body.status == "success") {
                        self.setState({
                            logout: true
                        });
                        localStorage.removeItem('username');
                    } else {
                        console.log("error in logout function")
                    }
                });
        }
  render() {
    return(
      <div>
        <Toolbar  style={ styles.toolbarStyle }>
          <ToolbarGroup style={styles.title}>
              <ToolbarTitle text="Get To Know" style={styles.title}/>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <AccountCircle className = "acc-cirlce" style={styles.account} color = "white" onClick={this.handlePopover}/>
              &nbsp;
            <ToolbarTitle text="Admin" style={styles.title} onClick={this.handlePopover}/>

          <Glyphicon glyph="log-out" className = "logout title"  onClick={this.logout}></Glyphicon>
          {this.state.logout ? <Redirect to='/' push={false} /> : ''}
            &nbsp;
          </ToolbarGroup>
        </Toolbar>
        {this.getComponent()}
      </div>
    );


    }
}

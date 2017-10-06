import React from 'react';
import { Glyphicon} from 'react-bootstrap';
import {Avatar} from 'material-ui';
import Logo from '../../assets/images/Logo.png';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import Popover from 'material-ui/Popover';
import {Redirect} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ChatInput from './Chats/ChatInput.js';
import ChatHistory from './Chats/ChatHistory.js';
import $ from 'jquery';
import superagent from 'superagent';
import  './User.css';

const styles = {
  title : {
    color : "white",
  },
}

export default class User extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        msgs: [],
        wordarr : [],
        logout:false
                };
    this.sendMessage = this.sendMessage.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.handlePopover = this.handlePopover.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.logout = this.logout.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    }
/*opens popover menu.Here event is used to make the popover to display in the target*/
handlePopover(event)
{
  event.preventDefault();
  this.setState({open:true,
  anchorEl: event.currentTarget});
}
/*closes the popover*/
handleRequestClose()
{
  this.setState({open:false});
}

/*following two function takes the message typed by the user in text box, split into words and send to server*/
sendMessage(message) {
    // for now this will let us know things work.  `console` will give us a
    // warning though
    let msgs = this.state.msgs;
    msgs.push(message);
    this.setState({msgs: msgs});
    this.getAnswer(message);
    }
getAnswer(message){
  let self = this;
  let msgs = this.state.msgs;
  console.log("message",message.What);
  $.ajax({
    url : '/users/answer',
    type : 'GET',
    data : {words: message.What},
    success : function(response) {
      console.log("response",response)
      msgs.push({  Who: "Bot",
                   What: "response",
                   When: new Date()});
      self.setState({msgs: msgs});
      return (<ChatHistory history={ self.state.msgs } />)

    },
    error : function(err) {
      console.log(err);
    }
});
}

logout() {
  let self= this;
  superagent
  .get('/users/logout')
  .end(function(err,res){

    if(res.body.status === 'error in logout') {
      console.log("error in logout");
    } else if(res.body.status === 'success'){
      self.setState({
        logout: true
      });
      localStorage.removeItem('username');
    } else {
      console.log("error in logoutfunction");
    }

  });
}

  getChatHistory() {
    let msgs=[];
    let self = this;
    superagent
        .get('/users/getchathistory')
        .query({username:localStorage.getItem('username')})
        .end(function(err, res) {
          if(err){
            console.log("error in retrieving chathistory");
          } else{
            res.body.result.messages.map(function(message){
              msgs.push({

                             What: message.value,
                             When:new Date(message.timestamp),
              });
              self.setState({msgs: msgs});
              
            });
          }

        });
  }


  componentWillMount() {
    this.getChatHistory();
  }

  render()
  {
    return(
      <div >
          <div>
            <nav className="navbar navbar-inverse appbar" >
              <div className="container-fluid">
                      <div className="navbar-header" >
                        <button type="button" className="navbar-toggle"
                          data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" style = {styles.title}>
                          <span >
                            <img src = {Logo} className = " logo responsive" alt = "Logo"/>
                          </span> Quora</a>
                      </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a  className="bookmark title"><Bookmark  /></a></li>
                    <li onClick={this.handlePopover}><a style = {styles.title}><span><Avatar  color = "white"
                      size = {30} backgroundColor = "purple" >U</Avatar>
                      </span> User</a></li>
                      <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}>
                            <Menu>
                              <MenuItem >
                              Notifications
                                <Badge badgeContent={10}
                                  badgeStyle={{top: 20, right: 0,left:30}}/>
                              </MenuItem>
                              <MenuItem primaryText="Logout"
                              onClick={this.logout} />
                            </Menu>
                      </Popover>
                  </ul>
                </div>
              </div>
              {this.state.logout ? <Redirect to='/' push={false} /> : ''}

          </nav>
          </div>
        <ChatHistory history={ this.state.msgs } />
        <ChatInput sendMessage={ this.sendMessage } />
      </div>
    );
  }

}

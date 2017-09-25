import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Glyphicon} from 'react-bootstrap';
import {Avatar} from 'material-ui';
import Logo from '../../assets/images/Logo.png';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ChatInput from './Chats/ChatInput.js';
import ChatHistory from './Chats/ChatHistory.js';
import  './User.css';


const styles = {
  appbar : {
    backgroundColor : "black",
  },
  badge : {
    width : '30px',
    height : '30px'
  },
  title : {
    color : "white",

  },
}




export default class User extends React.Component{
  constructor(props) {
      super(props);

      this.state = {
        open: false,
        msgs: []
      };
      this.sendMessage = this.sendMessage.bind(this);
    }


    sendMessage(message) {
    // for now this will let us know things work.  `console` will give us a
    // warning though
    let msgs = this.state.msgs;
    msgs.push(message);
    this.setState({
      msgs: msgs
    });
    console.log('history: ', msgs);
    }

  render()
  {

    return(
      <div className = "backgroundimage">
        <MuiThemeProvider >
          <div>
          <nav className="navbar navbar-inverse navbar-fixed-top" style = {styles.appbar}>
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" style = {styles.title} href="#">
                <span><img src = {Logo} className = " logo responsive" alt = "Logo"/></span> Quora</a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                <li><a href="#" className="bookmark"><Bookmark  style={styles.title}/></a></li>
                <li >
                <Badge
                  badgeContent={5}
                  secondary={true}
                  badgeStyle={{top: 10, right: 10,height:"18px",width:"18px"}}>
                    <NotificationsIcon style={styles.title}/></Badge></li>
                  <li><a href="#" style = {styles.title}><span><Avatar  color = "white" size = {30} backgroundColor = "purple" onClick={this.handleTouchTap}>U</Avatar></span> User</a></li>

                  <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                          >
                            <Menu>
                              <MenuItem primaryText="About Us" />
                              <MenuItem primaryText="Help &amp; feedback" />
                              <MenuItem primaryText="Settings"
                              rightIcon={<ArrowDropRight />}
                              menuItems={[
                               <MenuItem
                                value="V1"
                                primaryText="Change Password"
                              />,
                              <MenuItem
                               value="V2"
                               primaryText="Delete Account"
                             />,
                            ]}
                              />
                              <MenuItem primaryText="Log out" />
                            </Menu>
                          </Popover>
                </ul>
              </div>
            </div>
          </nav>
          </div>

          </MuiThemeProvider>
          <ChatHistory history={ this.state.msgs } />
          <ChatInput sendMessage={ this.sendMessage } />
      </div>

    );
  }

}

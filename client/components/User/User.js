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
import Logo from '../../assets/images/Logo.png';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import Popover from 'material-ui/Popover';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import $ from 'jquery';
import {
    Row,
    Col
} from 'react-flexbox-grid';
import superagent from 'superagent';
import ChatInput from './Chats/ChatInput.js';
import ChatHistory from './Chats/ChatHistory.js';
import Bookmarks from './Bookmarks.js';
import './User.css';

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


export default class User extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                open: false,
                msgs: [],
                wordarr: [],
                logout: false,
                answers: []
            };
            this.sendMessage = this.sendMessage.bind(this);
            this.getAnswer = this.getAnswer.bind(this);
            this.handlePopover = this.handlePopover.bind(this);
            this.handleRequestClose = this.handleRequestClose.bind(this);
            this.logout = this.logout.bind(this);
            this.getChatHistory = this.getChatHistory.bind(this);
            this.chatHistoryAnswers = this.chatHistoryAnswers.bind(this);
            this.handleClearChat = this.handleClearChat.bind(this);
        }
        componentWillMount() {
            this.getChatHistory({
                count: 1
            });
        }

        /*opens popover menu.Here event is used to make the popover to display in the target*/
        handlePopover(event) {
                event.preventDefault();
                this.setState({
                    open: true,
                    anchorEl: event.currentTarget
                });
            }
            /*closes the popover*/
        handleRequestClose() {
            this.setState({
                open: false
            });
        }

        /*following two function takes the message typed by the user in text box, split into words and send to server*/
        sendMessage(message) {
            // for now this will let us know things work.  `console` will give us a
            // warning though
            console.log("messageeeee", message);
            let msgs = this.state.msgs;
            msgs.push(message);
            this.setState({
                msgs: msgs
            });
            this.getAnswer(message);

        }

        chatHistoryAnswers(history) {
            superagent
                .post('/users/chathistory')
                .send(history)
                .end(function(err, res) {
                    if (err) {
                        console.log('error: ', err)
                    } else {
                        console.log("succesfully saved");
                    }
                });
        }

        handleClearChat() {
            let self = this;
            $.ajax({
                url: '/users/clear',
                type: 'post',
                data: {
                    username: localStorage.getItem('username')
                },
                success: function(response) {
                    console.log("deleted successfully", response);
                    self.setState({
                        msgs: []
                    });
                    self.setState({
                        open: false
                    });
                },
                error: function(err) {
                    console.log("Error", err);
                }
            })
        }

        getAnswer(message) {
                let when = new Date();
                this.state.answers = [];
                let self = this;
                let msgs = this.state.msgs;
                let answers = this.state.answers;

                console.log("message", message.What);
                $.ajax({
                        url: '/users/answer',
                        type: 'GET',
                        data: {
                            words: message.What
                        },
                        success: function(response) {
                            if (response.result == "no answer found") {
                                console.log(response.result);
                                console.log("message", message.What);
                                $.ajax({
                                    url: '/admin/unAnswered',
                                    type: 'POST',
                                    data: {
                                        question: message.What
                                    },
                                    success: function(response) {
                                        console.log("Question notified to be answered");
                                    },
                                    error: function(err) {
                                        console.log(err);
                                    }

                                })
                                msgs.push({
                                    Who: "Bot",
                                    What: "I'm sorry, I don't understand! Sometimes I have an easier time with a few simple keywords.",
                                    When: new Date(),

                                });
                            } else {
                                console.log("response", response.result);
                                response.result.map(function(item, index) {
                                    switch (item.label) {
                                        case 'text':
                                            {
                                                msgs.push({
                                                    Who: "Bot",
                                                    What: item.value,
                                                    When: when,
                                                    label: "text"
                                                });
                                                answers.push({
                                                    username: "Bot",
                                                    value: item.value,
                                                    timestamp: when.getTime(),
                                                    type: 'answer',
                                                    label: "text",
                                                    bookmark:false
                                                });
                                                break;
                                            }
                                        case 'blog':
                                            {
                                                msgs.push({
                                                    Who: "Bot",
                                                    What: item.value,
                                                    When: when,
                                                    label: "blog"
                                                });

                                                answers.push({
                                                    username: "Bot",
                                                    value: item.value,
                                                    timestamp: when.getTime(),
                                                    type: 'answer',
                                                    label: "blog",
                                                    bookmark: false
                                                });

                                                break;
                                            }
                                        case 'video':
                                            {
                                                msgs.push({
                                                    Who: "Bot",
                                                    What: item.value,
                                                    When: when,
                                                    label: "video"
                                                });

                                                answers.push({
                                                    username: "Bot",
                                                    value: item.value,
                                                    timestamp: when.getTime(),
                                                    type: 'answer',
                                                    label: "video",
                                                    bookmark:false
                                                });
                                                break;
                                            }
                                        default:
                                            {
                                                msgs.push({
                                                    Who: "Bot",
                                                    Answer: "item.value",
                                                    When: when
                                                });

                                                break;
                                            }
                                    }
                                })
                                self.setState({ answers: answers });

                                self.chatHistoryAnswers({
                                    username: localStorage.getItem('username'),
                                    messages: answers
                                });
                                self.setState({ msgs: msgs });

                                return ( < ChatHistory history = { self.state.msgs } />)

                                    self.chatHistoryAnswers({
                                        username: localStorage.getItem('username'),
                                        messages: answers
                                    }); console.log('answersin getanswer', self.state.answers);
                                } /*end of else*/
                                self.setState({ msgs: msgs});

                            },
                            error: function(err) {
                                console.log(err);
                            }
                        });
                }

                logout() {
                    let self = this;
                    superagent
                        .get('/users/logout')
                        .end(function(err, res) {

                            if (res.body.status === 'error in logout') {
                                console.log("error in logout");
                            } else if (res.body.status === 'success') {
                                self.setState({
                                    logout: true
                                });
                                localStorage.removeItem('username');
                            } else {
                                console.log("error in logoutfunction");
                            }

                        });
                }

                getChatHistory(data) {
                    let msgs = [];
                    let self = this;
                    superagent
                        .get('/users/getchathistory')
                        .query({
                            username: localStorage.getItem('username'),
                            skip: data.count
                        })
                        .end(function(err, res) {
                            if (err) {
                                console.log("error in retrieving chathistory");
                            } else {
                                if (res.body.result == null) {
                                    self.setState({ msgs: [] });
                                } else {
                                    console.log('getchathistory', res.body.result);
                                    res.body.result.messages.map(function(message) {
                                        console.log("label", message.label)
                                        msgs.push({
                                            Who: message.username,
                                            What: message.value,
                                            When: new Date(message.timestamp),
                                            label: message.label,
                                            bookmark: message.bookmark
                                        });
                                        self.setState({  msgs: msgs });
                                    });
                                }
                            }
                        });
                }
  render()
  {
    return(
         <div>
            <Toolbar  style={ styles.toolbarStyle }>
              <ToolbarGroup style={styles.title} >
                  <ToolbarTitle text="Get To Know" style={styles.title}/>
              </ToolbarGroup>
              <ToolbarGroup lastChild={true}>
                <AccountCircle className = "acc-cirlce" style={styles.account} color = "white" onClick={this.handlePopover}/>
                &nbsp;
                <ToolbarTitle text={localStorage.getItem('username')} style={styles.title} onClick={this.handlePopover}/>
                <Popover
                    style = {styles.title}
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}>
                    <Menu>
                      <MenuItem onClick = {this.handleClearChat}>
                        Clear ChatHistory
                      </MenuItem>
                      <MenuItem primaryText="Logout"
                      onClick={this.logout} />
                    </Menu>
              </Popover>
              {this.state.logout ? <Redirect to='/' push={false} /> : ''}
              </ToolbarGroup>
            </Toolbar>
            <Row>
                <Col xs = {4} className = "bookmark" style = {styles.title}>
                    <center><h4>Bookmarks</h4></center>
                    <Bookmarks />
                </Col>
                <Col xs = {8}>
                    <ChatHistory history={ this.state.msgs } getChatHistory = {this.getChatHistory.bind(this)}/>
                    <ChatInput sendMessage={ this.sendMessage } />
                </Col>
            </Row>
        </div>
    );

  }

}

import * as React from 'react';
import {Avatar} from 'material-ui';
import * as ReactDOM from 'react-dom';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookmarkFilled from 'material-ui/svg-icons/action/bookmark';
import Embedly from 'react-embedly';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './ChatHistory.css';
import ChatHistoryCard from './ChatHistoryCard.js';


class ChatHistory extends React.Component {
  scrollToBottom() {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
constructor()
{
  super();
  this.state = {
    flag : false,

  }
}

render() {
    console.log('history rendered: ', this.props.history)

    const { props } = this;
    // const { props, state } = this;
    // const props = this.props;
    // const state = this.state;
    return (
      <div className="MessageDiv collection"  ref="messageList" >
          {
            props.history.map(function(messageObj, index) {
              // const messageTime = messageObj.When.toLocaleTimeString();
              // const messageDate = messageObj.When.toLocaleDateString();
              // const messageDateTime = messageDate +" "+ messageTime
              return (
                <ChatHistoryCard messageObj = {messageObj} />

              )
            })
          }
     </div>

    );
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

}

export default ChatHistory;

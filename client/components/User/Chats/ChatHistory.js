import * as React from 'react';
import {
    Avatar
} from 'material-ui';
import * as ReactDOM from 'react-dom';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookmarkFilled from 'material-ui/svg-icons/action/bookmark';
import Embedly from 'react-embedly';
import {
    Row,
    Col
} from 'react-flexbox-grid';
import {
    Card,
    CardActions,
    CardHeader,
    CardText
} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import './ChatHistory.css';
import ChatHistoryCard from './ChatHistoryCard.js';


class ChatHistory extends React.Component {
        scrollToBottom() {
            const {
                messageList
            } = this.refs;
            const scrollHeight = messageList.scrollHeight;
            const height = messageList.clientHeight;
            const maxScrollTop = scrollHeight - height;
            ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
        constructor() {
            super();
            this.state = {
                flag: false,
                count: 1,
            }
            this.handleLoadMore = this.handleLoadMore.bind(this);
        }

        handleLoadMore() {
            let count = this.state.count + 1;
            this.setState({
                count: count
            });
            this.props.getChatHistory({
                count: count
            });
        }

        render() {
            const {
                props
            } = this;
            const self = this;
            return (  <div className =  "collection">
        <div className="messageDiv "  ref="messageList" >
          {props.history.length >2 ? <Chip onClick = {this.handleLoadMore}>Load more..</Chip>  : " "}
          { props.history.length == 0 ?<div className = "message">This is the beginning of your chat..</div>:
            props.history.map(function(messageObj, index) {
              return (
                <ChatHistoryCard messageObj = {messageObj} getBookmark = {self.props.getBookmarks} index={index}/>
              )
            })
          }
        </div>
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

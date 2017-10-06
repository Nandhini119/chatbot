import * as React from 'react';
import {Avatar} from 'material-ui';
import * as ReactDOM from 'react-dom';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookmarkFilled from 'material-ui/svg-icons/action/bookmark';
import { Row, Col } from 'react-flexbox-grid';
import './ChatHistory.css';

const style1 = {
  title : {
  color : "#8593e5",
  },
}

class ChatHistory extends React.Component {
  scrollToBottom() {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    console.log('history rendered: ', this.props.history)
    const { props } = this;
    return (
      <div className="MessageDiv"  ref="messageList" >
        <ul className="collection">
          {
            props.history.map(function(messageObj, index) {
              const messageTime = messageObj.When.toLocaleTimeString();
              const messageDate = messageObj.When.toLocaleDateString();
              return (
                <Row>
                 <Col xsOffset={5} xs={7}> <li className="msgalign" key={index}>
                  <div className="textalign">{messageObj.What}
                  </div> <br/>
                  <span className = "timealign">
                    {messageDate} &nbsp; &nbsp;
                    <i className="prefix mdi-action-alarm" /> {messageTime}
                  </span>&nbsp; &nbsp;
                  <span className="bookalaign">
                    <a className="bookmark">
                       <BookmarkBorder  style={style1.title}/>
                    </a>
                  </span>
                </li>
                </Col>
                </Row>
              )
            })
          }

        </ul>

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

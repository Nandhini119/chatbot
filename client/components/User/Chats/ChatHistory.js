import * as React from 'react';
import {Avatar} from 'material-ui';
import * as ReactDOM from 'react-dom';
import IconButton from 'material-ui/IconButton';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
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
                <li className="msgalign" key={index}>
                  <div className="textalign">{messageObj.What}
                  </div> <br/>
                  <span className = "timealign">
                    {messageDate} &nbsp; &nbsp;
                    <i className="prefix mdi-action-alarm" /> {messageTime}
                  </span>&nbsp; &nbsp;
                  <span className="bookalaign">
                    <a href="#" className="bookmark">
                       <Bookmark  style={style1.title}/>
                    </a>
                  </span>
                </li>
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

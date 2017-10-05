import * as React from 'react';
import {Avatar} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './ChatHistory.css';

class ChatHistory extends React.Component {
  render() {
    console.log('history rendered: ', this.props.history)
    const { props } = this;
    return (

      <ul className="collection">
        {
          props.history.map(function(messageObj, index) {
            const messageTime = messageObj.When.toLocaleTimeString();
            const messageDate = messageObj.When.toLocaleDateString();
            return (
              <li className="msgalign" key={index}>
                <div className="textalign">{messageObj.What}</div> <br/>
                <span className = "timealign">
                {messageDate} &nbsp; &nbsp;
                <i className="prefix mdi-action-alarm" /> {messageTime}
                </span>&nbsp; &nbsp;
              </li>

            )
          })
        }
      </ul>

    );
  }
}

export default ChatHistory;

import * as React from 'react';
import './ChatInput.css';

class ChatInput extends React.Component {
  constructor() {
    super();
    this.state = {
      userQuery: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    // Check if the message is empty
    const message = this.state.userQuery;
    if (message.length === 0) {
      return;
    }

    // Build a message object and send it
    const uid = "Vanitha";
    //const dat = new Date().getTime();
    const messageObj = {
      // Who: this.props.userID,
      Who: uid,
      What: message,
      When: new Date(),
    };

    this.props.sendMessage(messageObj);

    this.setState({
      userQuery: ''
    });
  };

  render() {
    const { props, onSubmit } = this;

    return (
      <footer>
        <form className="container" onSubmit={ onSubmit }>
          <div className="row">
            <div className="input-field col s10">
              <i className="prefix mdi-communication-chat" />
              <input
                type="text"
                placeholder="Type your message"
                value={this.state.userQuery}
                onChange={(e) => this.setState({userQuery: e.target.value})}
                />

            </div>
            <div className="input-field col s2">
              <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    );
  }
}

export default ChatInput;

import * as React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import './ChatInput.css';

class ChatInput extends React.Component {
  constructor() {
    super();
    this.state = {
      userQuery: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.pushHistory = this.pushHistory.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    // Check if the message is empty
    const message = this.state.userQuery;
    if (message.length === 0) {
      return;
    }

    let when = new Date();

    this.props.sendMessage({
      Who: localStorage.getItem('username'),
      What: message,
      When: when
    });
this.pushHistory({
      username: localStorage.getItem('username'),
      messages: [{
        type: 'question',
        value: message,
        timestamp: when.getTime()
      }]
    });

    this.setState({
      userQuery: ''
    });
  }
pushHistory(history){
   superagent
   .post('/users/chathistory')
   .send(history)
   .end(function(err, res) {
       if (err) {
           console.log('error: ', err)
       }
       else{
         console.log("succesfully saved");
       }
    });
}
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
                onChange={(e) => this.setState({ userQuery: e.target.value })}
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

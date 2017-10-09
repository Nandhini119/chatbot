import * as React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import { Row, Col } from 'react-flexbox-grid';
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
        username : localStorage.getItem('username'),
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
        <form  onSubmit={ onSubmit }>
          <Row end = 'xs'>

          <Col xs = {9}>
              <div className="input-field textfield">
                <i className="prefix mdi-communication-chat" />
                <input
                  type="text"
                  placeholder="Type your message"
                  value={this.state.userQuery}
                  onChange={(e) => this.setState({ userQuery: e.target.value })}
                  />
              </div>
              </Col>
              <Col xs = {2}>
              <div className="input-field">
                <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                  <i className="mdi-content-send" />
                </button>
              </div>
              </Col>
          </Row>
        </form>
      </footer>
    );
  }
}
export default ChatInput;

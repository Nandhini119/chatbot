import * as React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import {
    Row,
    Col
} from 'react-flexbox-grid';
import './ChatInput.css';
let BadWords = require('../../../badWords.json');


class ChatInput extends React.Component {
    constructor() {
            super();
            this.state = {
                userQuery: '',
            }
            this.onSubmit = this.onSubmit.bind(this);
            this.pushHistory = this.pushHistory.bind(this);
            this.handleCheck = this.handleCheck.bind(this);
        }
        /*to check for a badwords if present boolean value is passed to callback function*/
    handleCheck(message, callback) {
        let words = message.split(' ');
        for (var i = 0; i < words.length; i++) {
            if (BadWords.indexOf(words[i].toLowerCase()) >= 0) {
                callback(true);
                break;
            }
            if (words.length - 1 == i) {
                callback();
            }
        }
    }
    onSubmit(e) {
            let self = this;
            let when = new Date();
            e.preventDefault();
            // Check if the message is empty
            const message = this.state.userQuery;
            /*if the status is true it will block the user and change the status of the user to blocked in mongodb,
             if not the question will be passed to the controller to get the answer*/
            this.handleCheck(message, function(status) {
                if (status) {
                    self.props.sendMessage({
                        Who: localStorage.getItem('username'),
                        What: "badwords",
                        When: when,
                        label: "text"
                    })
                } else {
                    self.props.sendMessage({
                        Who: localStorage.getItem('username'),
                        What: message.toLowerCase(),
                        When: when,
                        label: "text"
                    });
                    /*data to be stored in mongodb for chathistories*/
                    self.pushHistory({
                        username: localStorage.getItem('username'),
                        messages: [{
                            username: localStorage.getItem('username'),
                            type: 'question',
                            value: message.toLowerCase(),
                            timestamp: when.getTime(),
                            bookmark: false,
                            label: "text"
                        }]
                    });
                }
            })
            if (message.length === 0) {
                return;
            }
            this.setState({
                userQuery: ''
            });
        }
        /*to store the chat data into db*/
    pushHistory(history) {
        superagent
            .post('/users/chathistory')
            .send(history)
            .end(function(err, res) {
                if (err) {
                    console.log('error: ', err)
                } else {}
            });
    }
    render() {
        const {
            props,
            onSubmit
        } = this;
        return ( <footer >
        <Row className = "footer" >
          <Col xs = {4} >
          </Col>
          <Col xs = {8}>
            <form  onSubmit={ onSubmit }>
              <Row end = "xs">
                <Col xs = {1}/>
                <Col xs = {7}>
                  <div className="input-field">
                    <i className="prefix mdi-communication-chat" />
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        value={this.state.userQuery}
                        onChange={(e) => this.setState({ userQuery: e.target.value })}/>
                  </div>
                </Col>
                <Col xs = {4}>
                  <div className="input-field">
                    <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                      <i className="mdi-content-send" />
                    </button>
                  </div>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </footer>
        );
    }
}
export default ChatInput;

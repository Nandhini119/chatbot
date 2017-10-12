import React from 'react';
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
import * as ReactDOM from 'react-dom';
import superagent from 'superagent';
import {
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import Close from 'material-ui/svg-icons/navigation/close';
import './User.css';

class Bookmarks extends React.Component {

        constructor() {
            super();
            this.state = {
                bookmarks: []
            }
            this.deleteBookmark = this.deleteBookmark.bind(this);
        }

        deleteBookmark() {
          let self = this;
            console.log("bookmark value", this.props.keys);
            let {
                bookmarks
            } = this.state;
            superagent
                .post('/users/deletebookmark')
                .send({
                    username: localStorage.getItem('username'),
                    value: this.props.bookmarks.value,
                })
                .end(function(err, res) {
                    if (err) {
                        console.log('error: ', err);
                    } else {
                      self.props.reloadBookmark();
                      self.props.reloadChatHistory();
                        console.log('delete bookmark response', res);
                    }
                });
            this.setState({
                bookmarks: bookmarks

            });
        }
  render() {
    let self = this;
    let date = new Date(this.props.bookmarks.timestamp)
    console.log(date)
    const messageDate =date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
    const messageDateTime = messageDate +" "+date.getHours() +":"+ date.getMinutes();
    return (
                    <div>
                      <Card className = "bookCard">
                      <Row>
                      <Col xs = {11}>
                        <CardHeader
                            title={this.props.bookmarks.username}
                            subtitle={messageDateTime}>
                            </CardHeader>

                        <CardText>
                            {this.props.bookmarks.value}
                        </CardText>
                        </Col>
                        <Col xs = {1}>
                        <Close  className = "close" onClick={()=> {self.deleteBookmark()}}/>
                        </Col>
                        </Row>
                      </Card>
            </div>
          )
  }

}

export default Bookmarks;

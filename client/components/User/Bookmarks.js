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
import superagent from 'superagent';
import './User.css';
import {
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import './Chats/ChatHistory.css';

class Bookmarks extends React.Component {

        constructor() {
            super();
            this.state = {
                bookmarks: []
            }
            // this.getBookmarks = this.getBookmarks.bind(this);
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

            //bookmarks: bookmarks.splice(this.props.keys, 1)
            this.setState({
                bookmarks: bookmarks

            });
        }
  render() {
    let self = this;
    let date = new Date(this.props.bookmarks.timestamp)
    return (
                    <div>
                      <Card className = "bookCard">
                        <CardHeader
                            title={this.props.bookmarks.username}
                            subtitle={this.props.bookmarks.timestamp} />
                        <CardText>
                            {this.props.bookmarks.value}
                        </CardText>
                        <CardActions >
                          <ButtonToolbar>
                            <Button bsSize="xs" onClick={()=> {self.deleteBookmark()}}>Delete</Button>
                          </ButtonToolbar>
                        </CardActions>
                      </Card>
            </div>
          )
  }
}

export default Bookmarks;

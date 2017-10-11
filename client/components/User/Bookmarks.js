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
import './User.css';

class Bookmarks extends React.Component {
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
                bookmarks: []
            }
            this.getBookmarks = this.getBookmarks.bind(this);
            this.deleteBookmark = this.deleteBookmark.bind(this);
        }

        componentWillMount() {
            this.getBookmarks();
        }

        getBookmarks() {
            let self = this;
            superagent
                .get('/users/bookmarks')
                .query({
                    username: localStorage.getItem('username')
                })
                .end(function(err, res) {
                    if (err) {
                        console.log('error: ', err);
                    } else {
                        if (res.body.result == null) {
                            self.setState({
                                bookmarks: []
                            });
                        } else {
                            self.setState({
                                bookmarks: res.body.result.bookmarks
                            })
                            console.log("succesfully saved");
                        }
                    }
                });
        }

        deleteBookmark(index) {
            //  console.log("bookmark value", this.state.bookmarks[index].value);
            let {
                bookmarks
            } = this.state;
            superagent
                .post('/users/deletebookmark')
                .send({
                    username: localStorage.getItem('username'),
                    value: bookmarks[index].value,
                })
                .end(function(err, res) {
                    if (err) {
                        console.log('error: ', err);
                    } else {
                        console.log('delete bookmark response', res);
                    }
                });
            //  console.log('bookmarks index',  bookmarks.splice(index, 1))
            bookmarks: bookmarks.splice(index, 1)
            this.setState({
                bookmarks: bookmarks

            });
        }
  render() {
    let self = this;
    return (
      <div className = "collection">
        <div className="MessageDiv "  ref="messageList" >
            {this.state.bookmarks.length == 0 ? <p>Add your bookmarks here....</p> :
               this.state.bookmarks.map(function(bookmark, index) {
            let time = bookmark.timestamp;
              return (
                <div>
                  <Row >
                    <Col cd  = {10}>
                      <div>
                        <Card className = "bookCard">
                          <CardHeader
                              title={bookmark.username}
                              subtitle={time} />
                          <CardText>
                              {bookmark.value}
                          </CardText>
                          <CardActions >
                            <ButtonToolbar>
                              <Button bsSize="xs" onClick={()=> {self.deleteBookmark(index)}}>Delete</Button>
                            </ButtonToolbar>
                          </CardActions>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </div>
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


export default Bookmarks;

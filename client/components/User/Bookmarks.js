import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import superagent from 'superagent';
import './Chats/ChatHistory.css';

class Bookmarks extends React.Component {

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
    .query({username: localStorage.getItem('username')})
    .end(function(err, res) {
        if (err) {
          console.log('error: ', err);
        } else {
          self.setState({bookmarks: res.body.result.bookmarks})
          console.log("succesfully saved");
        }
     });
  }

  deleteBookmark(index) {
    let { bookmarks } = this.state;
    // superagent
    // .post('/users/deletebookmark')
    // .send({
    //   username: localStorage.get('username'),
    //   timestamp: bookmarks[index].timestamp
    // })
    // .end(function(err, res) {
    //     if (err) {
    //       console.log('error: ', err);
    //     } else {
    //       console.log('delete bookmark response', res);
    //     }
    //  });
    this.setState({
      bookmarks: bookmarks.splice(index, 1)
    });
  }

  render() {
    let self = this;
    return (
      <div className="collection">
      <div className="MessageDiv"  ref="messageList" >
        {
          this.state.bookmarks.map(function(bookmark, index) {
            return (
              <div>
                <Row><Col><div><Card>
                  <CardHeader
                    title={bookmark.username}
                    subtitle={bookmark.timestamp}/>
                  <CardText>
                    {bookmark.value}
                  </CardText>
                  <CardActions >
                    <button type="button" onClick={()=> {self.deleteBookmark(index)}} />
                  </CardActions>
                </Card></div></Col></Row>
              </div>
            )
          })
        }
     </div>
     </div>
    );
  }
}

export default Bookmarks;

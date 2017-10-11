import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookmarkFilled from 'material-ui/svg-icons/action/bookmark';
import Embedly from 'react-embedly';
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
import './ChatHistory.css';

const style = {
    title: {
        color: "#8593e5"
    },
    alignmentRight: {
        marginLeft: "2%",
        marginRight: "2%",
    },
    alignmentLeft: {
        marginLeft: "75%",
    },
    bookmark: {
        color: "#8593e5",
        cursor: 'pointer'
    }
}



export default class ChatHistoryCard extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                flag: false,
                bookmark: false
            }
            this.addingBookmarks = this.addingBookmarks.bind(this);
            this.deleteBookmark = this.deleteBookmark.bind(this);
        }

        addingBookmarks() {


            let bookmark = {
                username: localStorage.getItem('username'),
                bookmarks: [{
                    username: localStorage.getItem('username'),
                    value: this.props.messageObj.What,
                    timestamp: this.props.messageObj.When.getTime()
                }]
            };
            console.log("inside bookmark");
            //  console.log('bookmark value', this.props.messageObj.What);
            let self = this;

            this.setState({
                bookmark: true
            })
            console.log("bookmark", bookmark);
            superagent
                .post('/users/addingbookmarks')
                .send(bookmark)
                .end(function(err, res) {
                    if (err) {
                        console.log('error: ', err)
                    } else {

                        console.log("succesfully saved: ", res);
                    }
                });
        }

        deleteBookmark(answer) {
            console.log('VALUE OF', answer);
            this.setState({
                bookmark: false
            });
            let {
                bookmarks
            } = this.state;
            superagent
                .post('/users/deletebookmark')
                .send({
                    username: localStorage.getItem('username'),
                    value: answer,
                })
                .end(function(err, res) {
                    if (err) {
                        console.log('error: ', err);
                    } else {
                        console.log('delete bookmark response', res);
                    }
                });
            //  console.log('bookmarks index',  bookmarks.splice(index, 1))

        }

  render() {
      let answer = this.props.messageObj.What;
      let self = this;
      const messageTime = this.props.messageObj.When.toLocaleTimeString();
      const messageDate = this.props.messageObj.When.toLocaleDateString();
      const messageDateTime = messageDate +"   "+ messageTime;
    return(
      <div>
        <Row className = {this.props.messageObj.Who == 'Bot'  ? "alignmentRight" : "alignmentLeft"}>
          <Col>
            <div>
            <Card className = {this.props.messageObj.Who == 'Bot'  ? "cardBot" : "cardUser"} style={{backgroundColor: this.props.messageObj.Who == 'Bot' ? '#E0E1D8' : '#F4EDCE'}}>
              <CardHeader
                  title={this.props.messageObj.Who}
                  subtitle={messageDateTime}/>
              <CardText className = "answer cardText textalign">
                {this.props.messageObj.label == 'video'  || this.props.messageObj.label == 'blog'?<div> <a href = {this.props.messageObj.What} target="_blank">{this.props.messageObj.What}</a>
                    <Embedly url={this.props.messageObj.What} target="_blank" apiKey="72fec89ac6014af6a46956b950a374d6"/></div>:
                                 <p>{this.props.messageObj.What}</p>}
              </CardText>
              <CardActions >
                {self.state.bookmark ? <BookmarkFilled  style={style.bookmark} onClick={this.deleteBookmark.bind(this,answer)} /> : <BookmarkBorder style={style.bookmark} onClick={this.addingBookmarks}/>}
              </CardActions>
            </Card>
            </div>
          </Col>
        </Row>
      </div>

    );
  }
}

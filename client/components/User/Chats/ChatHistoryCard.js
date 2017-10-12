import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookmarkFilled from 'material-ui/svg-icons/action/bookmark';
import Embedly from 'react-embedly';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import superagent from 'superagent';
import Bookmarks from '../Bookmarks.js';
import './ChatHistory.css';

const style = {
    title: {
        color: "#8593e5"
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
      flag : false,
      bookmark:false
    }
    this.addingBookmarks = this.addingBookmarks.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

addingBookmarks(){
  console.log("label",this.props.messageObj.question)
let bookmark = {
        username: localStorage.getItem('username'),
        bookmarks: [{
          username : this.props.messageObj.Who,
          value: this.props.messageObj.What,
          timestamp: this.props.messageObj.When.getTime(),
          label : this.props.messageObj.label,
          question : this.props.messageObj.question
        }]
      };
let self = this;

this.setState({bookmark:true})

    superagent
    .post('/users/addingbookmarks')
    .send({bookmark,data:{  username: localStorage.getItem('username'),
      bookmarks: [{
        username : localStorage.getItem('username'),
        value: this.props.messageObj.What,
        timestamp: this.props.messageObj.When.getTime()
      }]}})
    .end(function(err, res) {
        if (err) {
            console.log('error: ', err)
        }
        else{
            self.props.getBookmark();
          console.log("succesfully saved: ",res);

        }
     });
  }

 deleteBookmark(answer) {
   let self = this;
 // console.log('VALUE OF', answer);
  this.setState({bookmark:false});
    let { bookmarks } = this.state;
    superagent
     .post('/users/deletebookmark')
     .send({
       username: localStorage.getItem('username'),
       value:answer,
     })
     .end(function(err, res) {
         if (err) {
           console.log('error: ', err);
        } else {
          self.props.getBookmark();
           console.log('delete bookmark response', res);
         }
      });
    //  console.log('bookmarks index',  bookmarks.splice(index, 1))

  }

 componentWillMount(){
   if(this.props.messageObj.bookmark){
     this.setState({bookmark:true})
   } else {
     this.setState({bookmark:false})
   }
 }
  render() {
    let answer = this.props.messageObj.What;
      let self = this;
    const messageDate = this.props.messageObj.When.toLocaleDateString();

    const messageDateTime = messageDate +" "+this.props.messageObj.When.getHours() +":"+ this.props.messageObj.When.getMinutes();
    return(
      <div>
        <Row className = {this.props.messageObj.Who == 'Bot'  ? "alignmentRight" : "alignmentLeft"}>
          <Col xs = {12}>
            <div>
            <Card className = {this.props.messageObj.Who == 'Bot'  ? "cardBot" : "cardUser"} style={{backgroundColor: this.props.messageObj.Who == 'Bot' ? '#E0E1D8' : '#F4EDCE'}}>
              <CardHeader
                  title={this.props.messageObj.Who}
                  subtitle={messageDateTime}/>
              <CardText className = "answer cardText textalign">
              {this.props.messageObj.label == 'video'  || this.props.messageObj.label == 'blog'?<div> {this.props.messageObj.label} : <a href = {this.props.messageObj.What} target="_blank">{this.props.messageObj.What}</a>
                  <Embedly url={this.props.messageObj.What} target="_blank" apiKey="e59214aafcfd43169165962f374f6501"/></div>:
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

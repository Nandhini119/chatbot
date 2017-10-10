import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookmarkFilled from 'material-ui/svg-icons/action/bookmark';
import Embedly from 'react-embedly';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import superagent from 'superagent';
import Scrollbar from 'react-scrollbar';
import './ChatHistory.css';

const style = {
  title : {
    color : "#8593e5"
  },
  alignmentRight : {
    marginLeft : "2%",
    marginRight : "2%",
  },
  alignmentLeft : {
    marginLeft : "58%",
  },
  bookmark: {
    color : "#8593e5",
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
  }

addingBookmarks(){
  let bookmark = {
        username: localStorage.getItem('username'),
        bookmarks: [{
          username : localStorage.getItem('username'),
          value: this.props.messageObj.What,
          timestamp: this.props.messageObj.When.getTime()
        }]
      };
  console.log("inside bookmark");
this.setState({bookmark:true})
    superagent
    .post('/users/addingbookmarks')
    .send(bookmark)
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
      let self = this;
    const messageTime = this.props.messageObj.When.toLocaleTimeString();
    const messageDate = this.props.messageObj.When.toLocaleDateString();
    const messageDateTime = messageDate +" "+ messageTime;
    return(

      <div>
      <Row style = {this.props.messageObj.Who == 'Bot'  ? style.alignmentRight : style.alignmentLeft}>
      <Col xs = {12}>
       <div>

      <Card className = "card" style={{backgroundColor: this.props.messageObj.Who == 'Bot' ? '#E0E1D8' : '#F4EDCE'}}>
        <CardHeader
          title={this.props.messageObj.Who}
            subtitle={messageDateTime}/>
        <CardText className = "answer cardText">
        {this.props.messageObj.label == 'video'  || this.props.messageObj.label == 'blog'?<div> <a href = {this.props.messageObj.What} target="_blank">{this.props.messageObj.What}</a>
              <Embedly url={this.props.messageObj.What} target="_blank" apiKey="83a36ed51a5c4702ac93b438ff42dfe8"/></div>:
                           <p>{this.props.messageObj.What}</p>}
        </CardText>
        <CardActions >
          <span>{self.state.bookmark ? <BookmarkFilled  style={style.bookmark} onClick={()=>{self.setState({bookmark:false})}} /> : <BookmarkBorder style={style.bookmark} onClick={this.addingBookmarks}/>}</span>
        </CardActions>
      </Card>

      </div>

      </Col>
      </Row>
      </div>

    );
  }
}

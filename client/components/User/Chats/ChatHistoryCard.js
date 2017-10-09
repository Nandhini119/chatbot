import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookmarkFilled from 'material-ui/svg-icons/action/bookmark';
import Embedly from 'react-embedly';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import './ChatHistory.css';

const style = {
  title : {
  color : "#8593e5",
  },
  alignmentRight : {
    marginLeft : "2%",
    marginRight : "2%",
  },
  alignmentLeft : {
    marginLeft : "58%",
  }
}



export default class ChatHistoryCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flag : false,
    }
  }

  render() {
    const messageTime = this.props.messageObj.When.toLocaleTimeString();
    const messageDate = this.props.messageObj.When.toLocaleDateString();
    const messageDateTime = messageDate +" "+ messageTime;
    return(
      <div>
      <Row  style = {this.props.messageObj.Who == 'Bot'  ? style.alignmentRight : style.alignmentLeft }>
      <Col>
       <div>
      <Card style={{backgroundColor: this.props.messageObj.Who == 'Bot' ? '#E0E1D8' : '#F4EDCE'}}>
        <CardHeader
          title={this.props.messageObj.Who}
            subtitle={messageDateTime}/>
        <CardText className = "cardText">
        {this.props.messageObj.What}
        </CardText>
        <CardText className = "cardText">
        {this.props.messageObj.label == 'video'  || this.props.messageObj.label == 'blog'?<div> <a href = {this.props.messageObj.Answer} target="_blank">{this.props.messageObj.Answer}</a>
                            <Embedly url={this.props.messageObj.Answer} target="_blank" apiKey="65e045b599124726a05d7ac0cc57dbb1"/></div>:
                           <p>{this.props.messageObj.Answer}</p>}
        </CardText>
        <CardActions >
           <BookmarkBorder  style={style.title}/>
        </CardActions>
      </Card>
      </div></Col>
      </Row>
      </div>
    );
  }
}

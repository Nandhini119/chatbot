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
import Embedly from 'react-embedly';
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
            /* to delete the particular bookmark*/
        deleteBookmark() {
            let self = this;
            let {
                bookmarks
            } = this.state;
            superagent
                .post('/users/deletebookmarks')
                .send({
                    username: localStorage.getItem('username'),
                    value: this.props.bookmarks.value,
                })
                .end(function(err, res) {
                    if (err) {
                        console.log('error: ', err);
                    } else {
                        self.props.getBookmarks();
                        self.props.getChatHistory();
                    }
                });
            this.setState({
                bookmarks: bookmarks

            });
        }
        render() {
            let self = this;
            let date = new Date(this.props.bookmarks.timestamp)
            const messageDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            const messageDateTime = messageDate + " " + date.getHours() + ":" + date.getMinutes();
            return (
                    <div>
                      <Card className = "bookCard">
                      <Row>
                      <Col xs = {11}>
                        <CardHeader
                            title={this.props.bookmarks.question}
                            subtitle={messageDateTime}>
                            </CardHeader>
                        <CardText className = "textalign" >
                        {this.props.bookmarks.label == 'video'  || this.props.bookmarks.label == 'blog'?<div> {this.props.bookmarks.label} : <a href = {this.props.bookmarks.value} target="_blank">{this.props.bookmarks.value}</a>
                            <Embedly url={this.props.bookmarks.value} target="_blank" apiKey="e59214aafcfd43169165962f374f6501"/></div>:
                                         <p>{this.props.bookmarks.value}</p>}
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

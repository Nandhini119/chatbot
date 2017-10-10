import React from 'react';
import {
    IconButton
} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    CardTitle
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
    Row,
    Col
} from 'react-flexbox-grid';
import {
    Pagination
} from 'react-bootstrap';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import QuestionCard from './QuestionCard.js';
import './Admin.css';
import $ from 'jquery';


const styles = {
    card: {
        margin: "15px"
    },


}

export default class AllQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Questions: [],
            Answers: [],
            allquestions: "",
            activePage: 1,
            end  :false,

        }
        this.handlePagination = this.handlePagination.bind(this);
        this.updateComponent = this.updateComponent.bind(this);

    }

    componentWillMount() {
      this.updateComponent();

    }
    updateComponent() {
      var allQuestions = "";
      let self = this;
      $.ajax({
          url: '/admin/questions',
          method: 'GET',
          data: {
              skip: 0
          },
          success: function(response) {
              allQuestions = response.result.records.map((row, index) => {
                  return <QuestionCard question = {row} key = {index} id = {index} updateComponent = {this.updateComponent}/>
              })
              self.setState({
                  allquestions: allQuestions
              });

          },
          error: function(err) {
              console.log("Error", err);
          }
      })
    }
    handlePagination(eventKey) {
        this.setState({
            activePage: eventKey
        });
        var allQuestions = "";
        let self = this;
        $.ajax({
            url: '/admin/questions',
            method: 'GET',
            data: {
                skip: eventKey
            },
            success: function(response) {
                if(response.result.records.length > 0) {
                  self.setState({end : false});
                allQuestions = response.result.records.map((row, index) => {
                    return <QuestionCard question = {row} key = {index + eventKey} id = {index}/>
                })
                self.setState({
                    allquestions: allQuestions
                });
              } else {
                self.setState({end : true});
              }

            },
            error: function(err) {
                console.log("Error", err);
            }
        })
    }

    render() {
        return (
          <div className = "container-fluid background" >
            <IconButton tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()} >
              <ArrowBack color = "black" / >
            </IconButton>
            {this.state.end ? <center><h3>No more questions to display</h3></center> : this.state.allquestions}
            <Row center = 'xs' >
              <Pagination bsSize = "small" prev next first last ellipsis boundaryLinks
                  items = {10} maxButtons = {3}
                  activePage = {this.state.activePage}
                  onSelect = {this.handlePagination}/>
            </Row>
          </div>
        );
    }
}

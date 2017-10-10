import React from 'react';
import {IconButton} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-flexbox-grid';
import {
    Pagination
} from 'react-bootstrap';
import $ from 'jquery';
import UnAnsweredCard from './UnAnsweredCard.js';

const styles = {
  card  : {
    margin : "15px"
  },
  arrow : {
    position : "fixed",
  },
  marginTop : {
    marginTop : "80px",
  },
}

export default class UnAnswered extends React.Component
{

  constructor(props){
    super(props);
    this.state = {
      allquestions: "",
        activePage: 1,
          end : false,
    }
    this.handlePagination = this.handlePagination.bind(this);
  }
  componentWillMount() {
    var allQuestions = "";
    let self = this;
    $.ajax({
      url : '/admin/unAnswered',
      type : 'GET',
      data : { skip : 0},
      success : function(response) {
        //console.log("response",response);
        allQuestions = response.result.map((data, index) => {
            return <UnAnsweredCard question = {data} key = {index} id = {index}/>
        })
        self.setState({
            allquestions: allQuestions
        });

      },
      error : function(err) {
        console.log("Error",err);
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
        url: '/admin/unAnswered',
        method: 'GET',
        data: {
            skip: eventKey
        },
        success: function(response) {
          console.log("response",response.result);
            if(response.result.length > 0) {
              self.setState({end : false});
            allQuestions = response.result.map((data, index) => {
                return <UnAnsweredCard question = {data} key = {index + eventKey} id = {index}/>
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
  render(){
    return(
      <div className = "container-fluid background" >
      <IconButton style={styles.arrow} tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()} >
        <ArrowBack color = "black" / >
      </IconButton>
        <div style={styles.marginTop}>
          {this.state.end ? <center><h3>No more questions to display</h3></center> : this.state.allquestions}
          <Row center = 'xs'>
            <Pagination bsSize = "small" prev next first last ellipsis boundaryLinks
                items = {10} maxButtons = {3}
                activePage = {this.state.activePage}
                onSelect = {this.handlePagination}/>
          </Row>
        </div>
      </div>
    );
  }
}

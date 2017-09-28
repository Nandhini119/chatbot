import React from 'react';
import {IconButton} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-flexbox-grid';
import {Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import QuestionCard from './QuestionCard.js';


const styles = {
  card  : {
    margin : "15px"
  },


}

export default class AllQuestions extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      Questions : [],
      Answers : [],
      allquestions : "",

    }

  }

  componentWillMount()
  {
    var allQuestions = "";
    let self =this;
    $.ajax({
      url : '/admin/questions',
      type : 'GET',
      data : {},
      success : function(response)
      {
        allQuestions = response.result.records.map((row,index) => {
          return <QuestionCard question = {row} key = {index} id = {index}/>
        })
        self.setState({allquestions : allQuestions});

      },
      error : function(err) {
        console.log("Error",err);
      }
    })

  }



  render(){
    return(

      <div className = "container-fluid background">
      <IconButton tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()}>
      <ArrowBack color = "white"/>
      </IconButton>
      {this.state.allquestions}

      <ul className = 'pager'>
      <li className = "previous"><a>&larr;Previous</a></li>
      <li className = "next"><a>Next&rarr;</a></li>
      </ul>

      </div>
    );
  }
}

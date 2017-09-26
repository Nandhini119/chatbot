import React from 'react';
import {IconButton} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-flexbox-grid';
import {Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const Questions = [
  {
    question: "what is react??"
  },
  {
    question: "what is props?"
  },
  {
    question: "what is state?"

  },
  {
    question: "what are lifecycle methods?"
  },
  {
    question: "what are lifecycle methods?"
  },
  {
    question: "what are lifecycle methods?"
  },
  {
    question: "what are lifecycle methods?"
  },
  {
    question: "what are lifecycle methods?"
  }
]
const styles = {
  card  : {
    margin : "15px"
  }
}

export default class UnAnswered extends React.Component
{

  constructor(props){
    super(props);
    this.giveAnswer = this.giveAnswer.bind(this);
  }
  giveAnswer(){
    alert("give answer");
  }


  handleChange()
  {
    alert("HI");
  }
  render(){
    return(
      <div className = "container-fluid">

      <div>
      <IconButton tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()}>
      <ArrowBack color = "white"/>
      </IconButton>
        <Row center='xs'>
      {Questions.map((ques)=>(
        <Col xs = {10} sm = {6} lg = {4}>
      <Card style={styles.card}>
      <CardTitle title={ques.question} subtitle = {"click to give answer"}
      actAsExpander={true}
      />
    <CardText expandable={true}>
      <Form horizontal onSubmit = {this.giveAnswer}>
         <FormGroup controlId="formHorizontalEmail">
           <Col componentClass={ControlLabel} sm={2}>
             Answer
           </Col>
           <Col sm={6}>
             <FormControl type="text"  required/>
           </Col>
         </FormGroup>

         <FormGroup controlId="formHorizontalPassword">
           <Col componentClass={ControlLabel} sm={2}>
             Relation
           </Col>
           <Col sm={6}>
             <FormControl type="text" required/>
           </Col>
         </FormGroup>
         <FormGroup>
           <Col smOffset={1} sm={10}>
             <FlatButton primary = {true} type = "submit"  label="Give Answer" />
           </Col>
         </FormGroup>
         </Form>
    </CardText>
    <CardActions>
      <FlatButton secondary = {true} label="Discard" />
    </CardActions>
  </Card>
</Col>

))}
</Row>

      </div>

      </div>
    );
  }
}

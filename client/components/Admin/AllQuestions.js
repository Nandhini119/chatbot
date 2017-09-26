import React from 'react';
import {IconButton} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-flexbox-grid';
import {Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const Questions = [
  {
    question: "what is react??",
    answer : "sfefeafgererfdgrsgfdvrwtgfdweadsc"
  },
  {
    question: "what is props?",
    answer : "sfefaersdfolikmjkhngbvfsdazmj"
  },
  {
    question: "what is state?",
    answer : "sfefppoiuytrewadfghjkl;,mnbvcx"

  },
  {
    question: "what are lifecycle methods?",
    answer : "sfepliojuyhnvtgbjmsyrudt ugjif"
  },
  {
    question: "what are lifecycle methods?",
    answer : "sfefvr7eioiooooooooooZ$RikoikZAWEiko"
  },
  {
    question: "what are lifecycle methods?",
    answer : "sfefsezr oik0restrkuortesa"
  },
  {
    question: "what are lifecycle methods?",
    answer : "sfefrvf4eiowaaaaaaaaaaaaaaaaaaaaa"
  },
  {
    question: "what are lifecycle methods?",
    answer : "sfeferjyyerkoaswkke"
  }
]
const styles = {
  card  : {
    margin : "15px"
  },
  floatbutton : {
     marginRight: 20,
     float : "right"
  }

}

export default class AllQuestions extends React.Component
{
  constructor(props){
    super(props);
    this.viewAnswer = this.viewAnswer.bind(this);
  }
  viewAnswer(){
    alert("view answer");
  }

  render(){
    return(
      <div className = "container-fluid ">

      <div>
      <IconButton tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()}>
      <ArrowBack color = "white"/>
      </IconButton>
      <FloatingActionButton mini={true} tooltip = "add new question" style={styles.floatbutton}>
      <ContentAdd />
      </FloatingActionButton>
      <Row center='xs'>
    {Questions.map((ques)=>(
      <Col xs = {10} sm = {6} lg = {4}>
    <Card style={styles.card}>
    <CardTitle title={ques.question} subtitle = {"click to see answer"}
    actAsExpander={true}
    />
  <CardText expandable={true}>
    {ques.answer}
  <CardHeader>


    <Form horizontal onSubmit = {this.viewAnswer}>
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
           <FlatButton primary = {true} type = "submit"  label="update Answer" />
         </Col>
       </FormGroup>
       </Form></CardHeader>
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

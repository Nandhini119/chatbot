import React from 'react';
import {IconButton} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Row, Col} from 'react-flexbox-grid';
import {Form, FormGroup, FormControl, ControlLabel,Radio} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import $ from 'jquery';

const styles = {
  paper : {
    margin : 10,
  textAlign: 'center',
},

}

export default class newQuestions extends React.Component {
  constructor(props) {
  super(props);
this.state = {concept : " " ,
              question : " ",
              answer : " ",
              relation : " ",
              type : " ",
            };
this.handleConcept = this.handleConcept.bind(this);
this.handleQuestion = this.handleQuestion.bind(this);
this.handleAnswer = this.handleAnswer.bind(this);
this.handleansRelation = this.handleansRelation.bind(this);
this.handleansType = this.handleansType.bind(this);
this.addQuestion = this.addQuestion.bind(this);
}

handleConcept(event)
{
  var concept = event.target.value;
  this.setState({concept : concept});
}
handleQuestion(event)
{
  var question = event.target.value;
  this.setState({question : question});
}
handleAnswer(event)
{
  var answer = event.target.value;
  this.setState({answer : answer});
}
handleansRelation(event)
{
  var relation = event.target.value;
  this.setState({relation : relation});
}
handleansType(event) {
  var type = event.target.value;
  this.setState({type : type})
}
addQuestion()
{
  $.ajax({
    url : '/admin/questions',
    method : 'POST',
    data : {concept : this.state.concept,
            question : this.state.question,
            answer : this.state.answer,
            relation : this.state.relation,
            type : this.state.type},
    success : function(response) {
      alert("Question added successfully");
    },
    error : function(err) {
      concole.log("Error",err);
    }
  })

}
render() {
  return(
    <div className = "container-fluid">
    <IconButton tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()}>
    <ArrowBack color = "white"/>
    </IconButton>
    <Row center = 'xs'>
    <Col xs = {12} sm = {10}>
    <Paper style = {styles.paper} zDepth={3}>
    <br/>
    <h5>Add your new Question</h5>
    <Form horizontal onSubmit = {this.addQuestion}>
      <FormGroup  >
        <Col componentClass={ControlLabel}  smOffset={1} sm={2}>
          Concept
        </Col>
        <Col sm={6}>
        <FormControl type="text"  required onChange = {this.handleConcept}/>
        </Col>
        </FormGroup>
           <FormGroup >
             <Col componentClass={ControlLabel} smOffset={1} sm={2}>
              Question
             </Col>
             <Col sm={6}>
               <FormControl type="text"  required  onChange = {this.handleQuestion}/>
             </Col>
           </FormGroup>
            <FormGroup >
             <Col componentClass={ControlLabel} smOffset={1} sm={2}>
              Answer
             </Col>
             <Col sm={6}>
               <FormControl type="text"  required  onChange = {this.handleAnswer}/>
             </Col>
           </FormGroup>
           <FormGroup >
            <Col componentClass={ControlLabel} smOffset={1} sm={2}>
             Q & A Relation(either example or definition)
            </Col>
            <Col sm={6}>
              <FormControl type="text"  required  onChange = {this.handleansRelation}/>
            </Col>
          </FormGroup>
          <FormGroup >
           <Col componentClass={ControlLabel} smOffset={1} sm={2}>
            Answer type(text or video or blog)
           </Col>
           <Col sm={6}>
             <FormControl type="text"  required  onChange = {this.handleansType}/>
           </Col>
         </FormGroup>

           <FormGroup>
             <Col smOffset={1} sm={10}>
               <FlatButton primary = {true}  type = "submit"  label="Add Answer" />
             </Col>
           </FormGroup>
           </Form>

    </Paper>
    </Col>
    </Row>
    </div>
  );
}
}

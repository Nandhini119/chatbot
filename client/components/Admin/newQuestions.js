import React from 'react';
import {
    IconButton
} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {
    Row,
    Col
} from 'react-flexbox-grid';
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Radio
} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import $ from 'jquery';

const styles = {
    paper: {
        margin: 10,
        textAlign: 'center',
    },
    arrow: {
        position: "fixed",
        marginTop: "10px",
    },
    marginTop: {
        marginTop: "60px",
    }

}

export default class newQuestions extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                concept: " ",
                question: " ",
                answer: " ",
                relation: " ",
                type: " ",
                secondConcept : " ",
                firstForm : true,
                secondForm : false,
            };
            this.handleConcept = this.handleConcept.bind(this);
            this.handleSecondConcept = this.handleSecondConcept.bind(this);
            this.handleQuestion = this.handleQuestion.bind(this);
            this.handleAnswer = this.handleAnswer.bind(this);
            this.handleansRelation = this.handleansRelation.bind(this);
            this.handleansType = this.handleansType.bind(this);
            this.addQuestion = this.addQuestion.bind(this);
            this.handleOneConcept = this.handleOneConcept.bind(this);
            this.handleTwoConcepts = this.handleTwoConcepts.bind(this);
        }

        handleTwoConcepts() {
          this.setState({firstForm : false});
        }
        handleOneConcept() {
          this.setState({firstForm : true});
        }
        handleConcept(event) {
            var concept = event.target.value;
            this.setState({
                concept: concept
            });
        }
        handleSecondConcept(event) {
          var concept = event.target.value;
          this.setState({ secondConcept : concept});
        }
        handleQuestion(event) {
            var question = event.target.value;
            this.setState({
                question: question
            });
        }
        handleAnswer(event) {
            var answer = event.target.value;
            this.setState({
                answer: answer
            });
        }
        handleansRelation(event) {
            var relation = event.target.value;
            this.setState({
                relation: relation
            });
        }
        handleansType(event) {
                var type = event.target.value;
                this.setState({
                    type: type
                })
            }
            /*function to add new question to the db*/
        addQuestion() {
          if(this.state.firstForm) {
            $.ajax({
                url: '/admin/questions',
                method: 'POST',
                data: {
                    concept: this.state.concept,
                    question: this.state.question,
                    answer: this.state.answer,
                    relation: this.state.relation,
                    type: this.state.type,
                    alert: "one"
                },
                success: function(response) {
                    alert("Question added successfully");
                },
                error: function(err) {
                    concole.log("Error", err);
                }
            })

          } else {
            $.ajax({
                url: '/admin/questions',
                method: 'POST',
                data: {
                    concept: this.state.concept,
                    concepttwo: this.state.secondConcept,
                    question: this.state.question,
                    answer: this.state.answer,
                    relation: this.state.relation,
                    type: this.state.type,
                    alert: "two"
                },
                success: function(response) {
                    alert("Question added successfully");
                },
                error: function(err) {
                    concole.log("Error", err);
                }
            })
          }
            // $.ajax({
            //     url: '/admin/questions',
            //     method: 'POST',
            //     data: {
            //         concept: this.state.concept,
            //         question: this.state.question,
            //         answer: this.state.answer,
            //         relation: this.state.relation,
            //         type: this.state.type
            //     },
            //     success: function(response) {
            //         alert("Question added successfully");
            //     },
            //     error: function(err) {
            //         concole.log("Error", err);
            //     }
            // })

        }
        render() {
            return ( <div className = "container-fluid">
      <IconButton style={styles.arrow} tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()}>
        <ArrowBack color = "black"/>
      </IconButton>
      <Row center = 'xs' style={styles.marginTop}>
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
              {this.state.firstForm ? " " :<FormGroup  >
                <Col componentClass={ControlLabel}  smOffset={1} sm={2}>
                  Second Concept
                </Col>
                <Col sm={6}>
                  <FormControl type="text"  required onChange = {this.handleSecondConcept}/>
                </Col>
              </FormGroup>}
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
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                  Q and A relation
                </Col>
                <Col sm={6}>
                  <FormControl componentClass="select" onChange = {this.handleansRelation} placeholder="select">
                    <option value="definition_question_for">-----</option>
                    <option value="definition_question_for">definition_question_for</option>
                    <option value="example_question_for">example_question_for</option>
                    <option value="difference_question_for">difference_question_for</option>
                    <option value="reason_question_for">reason_question_for</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                  Answer type
                </Col>
                <Col sm={6}>
                  <FormControl componentClass="select" onChange = {this.handleansType} placeholder="select">
                    <option value="text">-----</option>
                    <option value="text">text</option>
                    <option value="video">video</option>
                    <option value="blog">blog</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={1} sm={10}>

                  {this.state.firstForm ?
                    <div><FlatButton primary = {true}  type = "submit"  label="Add Answer" /><br/><FlatButton secondary = {true}  type = "submit"  label="click here to add question between two concepts" onClick = {this.handleTwoConcepts}/> </div>:
                    <div><FlatButton primary = {true}  type = "submit"  label="Add Answer" /><br/><FlatButton secondary = {true}  type = "submit"  label="click here to add question for single concept" onClick = {this.handleOneConcept}/></div>}
                </Col>
              </FormGroup>
            </Form>
          </Paper>
        </Col>
      </Row>
    </div>  );
            }
        }

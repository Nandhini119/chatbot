import React from 'react';
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
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Radio
} from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import Close from 'material-ui/svg-icons/navigation/close';
import $ from 'jquery';
import UnAnswered from './UnAnswered.js';


const styles = {
    card: {
        margin: "15px"
    },

}

export default class UnAnsweredCard extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                questionTitle: this.props.question.question,
                open: false,
                concept: " ",
                question: " ",
                answer: " ",
                relation: " ",
                type: " ",

            };
            this.handleOpen = this.handleOpen.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.handleDiscard = this.handleDiscard.bind(this);
            this.addQuestion = this.addQuestion.bind(this);
            this.handleConcept = this.handleConcept.bind(this);
            this.handleQuestion = this.handleQuestion.bind(this);
            this.handleAnswer = this.handleAnswer.bind(this);
            this.handleansRelation = this.handleansRelation.bind(this);
            this.handleansType = this.handleansType.bind(this);
        }
        handleOpen() {
            this.setState({
                open: true
            });
        }
        handleClose() {
                this.setState({
                    open: false
                });
            }
            /* to delete a particular question which are in unanswered list*/
        handleDiscard() {
            let self = this;
            console.log('handleDiscard: ', this.props);
            $.ajax({
                url: '/admin/question/' + this.state.questionTitle,
                type: 'POST',
                data: {},
                success: function(response) {
                    if (response.result == "successfully deleted") {
                        alert("successfully deleted ")
                    } else {
                        alert("error in deleting");
                    }
                },
                error: function(err) {
                    console.log("Error", err);
                }
            })
        }
        handleConcept(event) {
            var concept = event.target.value;
            this.setState({
                concept: concept
            });
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
            /*to add the unanswered question to neo4j with answered */
        addQuestion() {
            let self = this;
            $.ajax({
                url: '/admin/questions',
                method: 'POST',
                data: {
                    concept: this.state.concept,
                    question: this.state.question,
                    answer: this.state.answer,
                    relation: this.state.relation,
                    type: this.state.type
                },
                success: function(response) {
                    alert("Question added successfully");
                    self.setState({
                        open: false
                    });
                    self.handleDiscard();
                },
                error: function(err) {
                    concole.log("Error", err);
                }
            })

        }
        render() {
                return ( <div >
      <Row center = 'xs' >
        <Col xs = {8} >
          <Card style = {styles.card} >
          <CardTitle
              title={this.props.question.question}
              subtitle={"-asked by"+" "+this.props.question.username}>
              </CardTitle>
            <CardActions >
              <FlatButton primary = {true} label = "Add answer" onClick = {this.handleOpen}/>
              <FlatButton secondary = {true} label = "Discard" onClick = {this.handleDiscard}/>
            < /CardActions >
            <Dialog title = {"Add answer for " + this.state.questionTitle}
                actions = { < FlatButton label = "Cancel"
                primary = {true}
                onClick = {this.handleClose}/>}
                open = {this.state.open}
                onRequestClose = {this.handleClose} >
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
                      <FlatButton primary = {true}  type = "submit"  label="Add Answer" />
                    </Col>
                  </FormGroup>
                </Form>
            </Dialog>
          </Card>
        < /Col >
      </Row>
    </div>);

                    }
                }

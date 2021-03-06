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
import $ from 'jquery';
import CardAnswer from './CardAnswer.js';


const styles = {
    card: {
        margin: "15px"
    },

}

export default class QuestionCard extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                answers: "",
                question: this.props.question._fields[0].properties.name,
                open: false,
                name: " ",
                label: " ",
                relation: " ",
            }
            this.handleOpen = this.handleOpen.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.addAnswer = this.addAnswer.bind(this);
            this.handleName = this.handleName.bind(this);
            this.handleLabel = this.handleLabel.bind(this);
        }
        componentWillMount() {
            var answer = " ";
            answer = this.props.question._fields[1].map((row, index) => {
                return <CardAnswer answer = {
                    row
                }
                key = {
                    index
                }
                />
            })
            this.setState({
                answers: answer
            });
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
        handleName(event) {
            var name = event.target.value;
            this.setState({
                name: name
            });
        }
        handleLabel(event) {
                var label = event.target.value;
                this.setState({
                    label: label
                });
            }
            /*to add new answer for existing question*/
        addAnswer() {
            console.log(this.state.question);
            let self = this;
            $.ajax({
                url: '/admin/answer',
                method: 'POST',
                data: {
                    question: this.state.question,
                    label: this.state.label,
                    name: this.state.name,
                },
                success: function(response) {
                    alert("successfully answer added");
                    self.setState({
                        open: false
                    });
                    self.props.updateComponent();

                },
                error: function(err) {
                    console.log("Error" + err);
                }
            })
        }

        render() {
                return ( <div >
            <Row center = 'xs' >
              <Col xs = {11} >
                <Card style = {styles.card} >
                  <CardTitle title = {this.props.question._fields[0].properties.name}
                         subtitle = {"click to see answer"}
                         actAsExpander = {true}/>
                    <Dialog title = {"Add answer for " + this.state.question}
                        actions = { < FlatButton label = "Cancel"
                        primary = {true}
                        onClick = {this.handleClose}/>}
                        open = {this.state.open}
                        onRequestClose = {this.handleClose} >
                      <Form horizontal onSubmit = {this.addAnswer} >
                        <FormGroup controlId = "formControlsSelect" >
                          <Col componentClass = {ControlLabel} smOffset = {1} sm = {2} >
                            Answer type
                          </Col>
                          <Col sm = {6} >
                            <FormControl componentClass = "select" onChange = {this.handleLabel} placeholder = "select" >
                              <option value = "text" > -- -- - < /option>
                              <option value = "text" > text < /option>
                              <option value = "video" > video < /option>
                              <option value = "blog" > blog < /option>
                            < /FormControl >
                          </Col>
                        < /FormGroup >
                        <FormGroup >
                          <Col componentClass = {ControlLabel} smOffset = {1} sm = {2} >
                            Answer
                          </Col>
                          <Col sm = {6} >
                            <FormControl type = "text" required onChange = {this.handleName}/>
                          < /Col >
                        </FormGroup>
                        <FormGroup >
                          <Col smOffset = {1} sm = {10} >
                            <FlatButton primary = {true} type = "submit" label = "Add Answer" / >
                          </Col>
                        < /FormGroup >
                      </Form>
                    </Dialog>
                  <CardText expandable = {true} >
                    {this.state.answers}
                  </CardText>
                  <CardActions >
                    <FlatButton secondary = {true} label = "Add answer" onClick = {this.handleOpen}/>
                  < /CardActions >
                </Card>
              < /Col >
            </Row>
          </div>);

                    }
                }

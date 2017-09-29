import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'react-flexbox-grid';
import {Form, FormGroup, FormControl, ControlLabel,Radio} from 'react-bootstrap';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Chip from 'material-ui/Chip';
import $ from'jquery';
import CardAnswer from'./CardAnswer.js';


const styles = {
  card  : {
    margin : "15px"
  },
  floatbutton : {
     marginRight: 20,
     float : "right"
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 10,
  },

}

export default class QuestionCard extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      answers : "",
      question : this.props.question._fields[0].properties.name,
      open : false,
      name : " ",
      label : " ",
      relation : " ",
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
  }
  componentWillMount()
  {
    var answer = " ";
    answer = this.props.question._fields[1].map((row,index) => {
        return <CardAnswer answer = {row} key = {index}/>
      })

    this.setState({answers : answer});

  }

handleOpen() {
  this.setState({open : true});
}
handleClose() {
  this.setState({open : false});
}
handleName(event) {
  var name = event.target.value;
  this.setState({name : name});
}
handleLabel(event) {
  var label = event.target.value;
  this.setState({label : label});
}

addAnswer() {
  console.log(this.state.question);
  // $.ajax({
  //   url : '/admin/answer',
  //   method : 'POST',
  //   data : {question : this.state.question,
  //           label : this.state.label,
  //           name : this.state.name,
  //           },
  //   success : function(response) {
  //     console.log(response);
  //
  //   },
  //   error : function(err) {
  //     console.log("Error"+err);
  //   }
  // })
}

  render () {
    return (
      <div>
      <Row center='xs'>
      <Col xs = {11} >
    <Card style={styles.card}>
    <CardTitle title={this.props.question._fields[0].properties.name} subtitle = {"click to see answer"}
    actAsExpander={true}/>
    <Dialog
          title={"Add answer for "+this.state.question}
          actions={<FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />}
          open={this.state.open}
          onRequestClose={this.handleClose}>


            <Form horizontal onSubmit = {this.addAnswer}>
                <FormGroup  >
                  <Col componentClass={ControlLabel} sm={2}>
                    Label(blog or text or video)
                  </Col>
                  <Col sm={6}>
                  <FormControl type="text"  required onChange = {this.handleLabel}/>
                  </Col>
                </FormGroup>
                     <FormGroup >
                       <Col componentClass={ControlLabel} sm={2}>
                        Answer
                       </Col>
                       <Col sm={6}>
                         <FormControl type="text"  required  onChange = {this.handleName}/>
                       </Col>
                     </FormGroup>
                     <FormGroup>
                       <Col smOffset={1} sm={10}>
                         <FlatButton primary = {true} type = "submit"  label="Add Answer" />
                       </Col>
                     </FormGroup>
                     </Form>


        </Dialog>
  <CardText expandable={true}>
    {this.state.answers}
  </CardText>
  <CardActions>
    <FlatButton secondary = {true} label="Add answer" onClick={this.handleOpen} />
  </CardActions>

</Card>
</Col>
</Row>

</div>

    );

  }
}

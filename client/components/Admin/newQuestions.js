import React from 'react';
import {IconButton} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Row, Col} from 'react-flexbox-grid';
import {Form, FormGroup, FormControl, ControlLabel,Radio} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

const styles = {
  paper : {
    margin: 20,
  textAlign: 'center',
  }
}

export default class newQuestions extends React.Component {
render() {
  return(
    <div className = "container-fluid">
    <IconButton tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()}>
    <ArrowBack color = "white"/>
    </IconButton>
    <Row center = 'xs'>
    <Col xs = {12} sm = {8}>
    <Paper style = {styles.paper} zDepth={3}>
    <br/>
    <h5>Add your new Question</h5>
    <Form horizontal >
      <FormGroup  >
        <Col componentClass={ControlLabel} sm={2}>
          Label
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

    </Paper>
    </Col>
    </Row>
    </div>
  );
}
}

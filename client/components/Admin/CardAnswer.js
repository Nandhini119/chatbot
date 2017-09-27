import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';


export default class CardAnswer extends React.Component {

componentWillMount() {
  console.log(this.props.answer);
}

  render() {
  return (
    <div>
    if(true)

    <h5>{this.props.answer.labels[0]} </h5>  {this.props.answer.properties.name}
    </div>

  );
}
}

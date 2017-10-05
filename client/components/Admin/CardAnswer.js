import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    CardTitle
} from 'material-ui/Card';


export default class CardAnswer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                flag: false,
            }
        }

        componentWillMount() {
            if (this.props.answer.labels[0] == "blog" || this.props.answer.labels[0] == "video") {
                console.log()
                this.setState({
                    flag: true
                });
            }

        }
  render() {
    return (
      <div>
        <h5>{this.props.answer.labels[0]} </h5>
        {this.state.flag ? <a href = {this.props.answer.properties.name} target="_blank">{this.props.answer.properties.name}</a> :
                           <p>{this.props.answer.properties.name}</p>}

      </div>
    );
  }
}

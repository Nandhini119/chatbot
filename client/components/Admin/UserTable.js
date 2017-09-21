import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button : {
    margin : 15
  }
};


export default class UserTable extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    button : true
    }
    this.handleBlock = this.handleBlock.bind(this);
    this.handleUnblock = this.handleUnblock.bind(this);
  }
handleBlock()
{
  this.setState({button : false});
}
handleUnblock()
{
  this.setState({button : true});
}


render()
{
  return(
                <TableRow>
                    <TableRowColumn>{this.props.id}</TableRowColumn>
                    <TableRowColumn>{this.props.userdata.name}</TableRowColumn>
                    <TableRowColumn>{this.props.userdata.mailid}</TableRowColumn>
                     <TableRowColumn>
                     {this.state.button?<RaisedButton label="Block" primary = {true} onClick = {this.handleBlock} style={styles.button} /> :
                   <RaisedButton label="Unblock" backgroundColor = "#FE4A3A" style={styles.button} onClick = {this.handleUnblock}/> }</TableRowColumn>
                  </TableRow>
  );
}
}

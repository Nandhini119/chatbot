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
import $ from 'jquery';

const styles = {
  button : {
    margin : 15,
  }
};


export default class UserTable extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
    button : true,
    }
    this.handleBlock = this.handleBlock.bind(this);
    this.handleUnblock = this.handleUnblock.bind(this);
  }
  componentWillMount() {
    let self = this;
    $.ajax({
      url : '/admin/checkstatus',
      type : 'GET',
      data : {email : this.props.userdata.email},
      success :  function(response) {
        if(response[0].status == 'blocked')
        {
          self.setState({button : false});
        }else if(response[0].status == 'active')
        {
          self.setState({button : true});
        }
        else {}
      },

    error :
      function(err) {
        console.log(err);
      }


    })
  }
handleBlock()
{
  let self = this;
  $.ajax({
    url : '/admin/block',
    type : 'POST',
    data : {email : this.props.userdata.email},
    success :  function(response) {
      self.setState({button : false});
    },
    error :  function(err) {
      console.log(err);
    }
  })

}
handleUnblock()
{

  let self = this;
  $.ajax({
    url : '/admin/unblock',
    type : 'POST',
    data : {email : this.props.userdata.email},
    success :  function(response) {
      self.setState({button : true});
    },
    error :  function(err) {
      console.log(err);
    }
  })
}
render()
{
  return(
                <TableRow>
                    <TableRowColumn>{this.props.id}</TableRowColumn>
                    <TableRowColumn>{this.props.userdata.username}</TableRowColumn>
                    <TableRowColumn>{this.props.userdata.email}</TableRowColumn>
                     <TableRowColumn>
                     {this.state.button?<RaisedButton label="Block" primary = {true} onClick = {this.handleBlock} style={styles.button} /> :
                   <RaisedButton label="Unblock" backgroundColor = "#FE4A3A" style={styles.button} onClick = {this.handleUnblock}/> }</TableRowColumn>
                  </TableRow>
  );
}
}

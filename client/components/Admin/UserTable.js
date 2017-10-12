import React from 'react';
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
import {
    Row,
    Col
} from 'react-flexbox-grid';
import $ from 'jquery';
import './Admin.css';

const styles = {
    button: {
        margin: 15,
    }
};


export default class UserTable extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                    button: true,
                }
                this.handleBlock = this.handleBlock.bind(this);
                this.handleUnblock = this.handleUnblock.bind(this);
            }
            /*to check the status of the user on rendering this component*/
        componentWillMount() {
            let self = this;
            $.ajax({
                url: '/admin/status',
                method: 'GET',
                data: {
                    username: this.props.userdata.username
                },
                success: function(response) {
                    if (response[0].status == 'blocked') {
                        self.setState({
                            button: false
                        });
                    } else if (response[0].status == 'active') {
                        self.setState({
                            button: true
                        });
                    } else {}
                },

                error: function(err) {
                    console.log(err);
                }
            })
        }
        /*to block the user*/
        handleBlock() {
            let self = this;
            $.ajax({
                url: '/admin/block',
                method: 'POST',
                data: {
                    username: this.props.userdata.username
                },
                success: function(response) {
                    self.setState({
                        button: false
                    });
                },
                error: function(err) {
                    console.log(err);
                }
            })

        }
        /*to unblock the user*/
        handleUnblock() {

            let self = this;
            $.ajax({
                url: '/admin/unblock',
                method: 'POST',
                data: {
                    username: this.props.userdata.username
                },
                success: function(response) {
                    self.setState({
                        button: true
                    });
                },
                error: function(err) {
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

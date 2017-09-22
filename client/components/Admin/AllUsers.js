import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {IconButton} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Row, Col} from 'react-flexbox-grid';
import $ from 'jquery';
import UserTable from './UserTable.js';


const tableData = [
  {
    name: 'John Smith',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Randal White',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Stephanie Sanders',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Steve Brown',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Joyce Whitten',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Samuel Roberts',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Adam Moore',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Adam Moore',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Adam Moore',
    mailid: 'abc.gmail.com',
  },
  {
    name: 'Adam Moore',
    mailid: 'abc.gmail.com',
  },
];


export default class AllUsers extends React.Component
{

  componentWillMount() {
    alert("hi allusers");
    $.ajax({
            url: '/admin/allusers',
            type: 'GET',
            data: { },
            success: function(response) {
              console.log(response.result)
                        },
                        error: function(err) {
                          console.log(err)
                            }
              });
  }
  render(){
    return(
      <div className = "container-fluid ">

      <div>
      <IconButton tooltip = "Back to home" onClick = {() => this.props.nullifyComponent()}>
      <ArrowBack color = "white"/>
      </IconButton>
      <Row center='xs'>
      <Col xs={8}>
      <div>
        <Table
          fixedHeader={true}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn >Name</TableHeaderColumn>
              <TableHeaderColumn >Mail-ID</TableHeaderColumn>
              <TableHeaderColumn ></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}>
            {tableData.map((row, index) => {
              return (<UserTable userdata = {row} id={index}/>);
            }
              )}
          </TableBody>
        </Table>

      </div>
      </Col>
      </Row>
      </div>

      </div>
    );
  }
}

import React from 'react';
import {
    IconButton
} from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
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
    Pagination
} from 'react-bootstrap';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import QuestionCard from './QuestionCard.js';
import './Admin.css';
import $ from 'jquery';


const styles = {
    card: {
        margin: "15px"
    },


}

export default class AllQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Questions: [],
            Answers: [],
            allquestions: "",
            activePage: 1,
            items: 0,

        }
        this.handlePagination = this.handlePagination.bind(this);


    }

    componentWillMount() {
        var allQuestions = "";
        let self = this;
        $.ajax({
            url: '/admin/questions',
            method: 'GET',
            data: {
                skip: 0
            },
            success: function(response) {
                self.setState({
                    items: response.items / 2
                })
                allQuestions = response.result.records.map((row, index) => {
                    return <QuestionCard question = {row} key = {index} id = {index}/>
                })
                self.setState({
                    allquestions: allQuestions
                });

            },
            error: function(err) {
                console.log("Error", err);
            }
        })

    }
    handlePagination(eventKey) {
        this.setState({
            activePage: eventKey
        });
        var allQuestions = "";
        let self = this;
        $.ajax({
            url: '/admin/questions',
            method: 'GET',
            data: {
                skip: eventKey
            },
            success: function(response) {
                allQuestions = response.result.records.map((row, index) => {
                    return <QuestionCard question = {row} key = {index + eventKey} id = {index}/>
                })
                self.setState({
                    allquestions: allQuestions
                });

            },
            error: function(err) {
                console.log("Error", err);
            }
        })
    }

    render() {
        return ( <
            div className = "container-fluid background" >
            <
            IconButton tooltip = "Back to home"
            onClick = {
                () => this.props.nullifyComponent()
            } >
            <
            ArrowBack color = "white" / >
            <
            /IconButton> {
                this.state.allquestions
            } <
            Row center = 'xs' >
            <
            Pagination bsSize = "small"
            prev next first last ellipsis boundaryLinks items = {
                4
            }
            maxButtons = {
                3
            }
            activePage = {
                this.state.activePage
            }
            onSelect = {
                this.handlePagination
            }
            /> <
            /Row> <
            /div>
        );
    }
}
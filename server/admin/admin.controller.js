let user = require('../user/user.model.js');
let driver = require('../config/neo4j.js');
/* connecting to the db */
let session = driver.session();
let items = 0;
let skip = 0;
let controls = {
    allUsers: function(req, res) {
        user.find({
            type: "user"
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.status(200).json({
                    result: data
                });
            }
        });
    },
    checkstatus: function(req, res) {
        user.find({
            email: req.query.email
        }, function(err, data) {
            if (err)
                throw err;
            else {
                console.log(data);
                res.send(data)
            }
        });
    },
    blockUsers: function(req, res) {
        user.update({
            'email': req.body.email
        }, {
            'status': 'blocked'
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.status(200).json({
                    status: 'status changed'
                });
            }
        })
    },
    unblockUsers: function(req, res) {
        user.update({
            'email': req.body.email
        }, {
            'status': 'active'
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.status(200).json({
                    status: 'status changed'
                });
            }
        })
    },
    questions: function(data, successCB, errorCB) {
        let query = " ";
        let q = 'MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m)';
        session.run(q).then(function(res) {
            items = res.records.length;
        }).catch(function(err) {
            console.log("Error" + err);
        })
        if (data.skip == 0 || data.skip == 1) {
            skip = 0
                /* building a cypher query */
            query = `MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m) order by n.name skip ${skip} limit 2;`;
        } else {
            skip = 2 * (parseInt(data.skip) - 1);
            /* building a cypher query */
            query = `MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m) order by n.name skip ${skip} limit 2;`;
        }

        /* executing the cypher query */
        session.run(query).then(function(result) {
            console.log("query for displaying questions running");
            successCB(result, items);
        }).catch(function(err) {
            errorCB(err);
        });
    },
    answer: function(data, successCB, errorCB) {
        console.log("in  answer");
        var label;
        let query = " ";
        console.log(data);
        /* building a cypher query */
        query = `merge (n:${data.label}{name:"${data.name}"}) with n\
             match (m:question{name:"${data.question}"})\
             merge (m)<-[r:answer_to]-(n) return n,m`;

        /* executing the cypher query */
        session.run(query).then(function(result) {
            console.log("query for adding answer running");
            successCB(result);
        }).catch(function(err) {
            errorCB(err);

        });
    },
    newQuestions: function(data, successCB, errorCB) {
        let query = " ";
        console.log("in adding new questions");
        console.log(data);
        query = `match (n:domain{name:"react"})\
                merge (m:concept{name:"${data.concept}"})-[r:concept_of]->(n) with n,m\
                merge (o:question{name:"${data.question}"})-[q:${data.relation}]->(m) with m,o\
                merge (p:${data.type}{name:"${data.answer}"})-[t:answer_to]->(o)  return p,o,m;`;

        /* executing the cypher query */
        session.run(query).then(function(result) {
            console.log("query for adding new question running");


            successCB(result);
        }).catch(function(err) {
            errorCB(err);

        });
    }


}
module.exports = controls;

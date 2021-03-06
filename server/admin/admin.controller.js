let user = require('../user/user.model.js');
let unansweredquestions = require('./admin.unAnswered.model.js');
let driver = require('../config/neo4j.js');
/* connecting to the db */
let session = driver.session();
let items = 0;
let skip = 0;
let skipForUnanswered = 0;
let controls = {
    /*give all the users in database from mongodb*/
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
    /*check the status of the user whether blocked or active in mongodb*/
    checkstatus: function(req, res) {
        user.find({
            username: req.query.username
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.send(data)
            }
        });
    },
    /*will change the status of the user to blocked on block request*/
    blockUsers: function(req, res) {
        user.update({
            'username': req.body.username
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
    /*will change the status of the user ot active on unblock request*/
    unblockUsers: function(req, res) {
        user.update({
            'username': req.body.username
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
    /*get all the questions from the neo4j db*/
    getquestions: function(data, successCB, errorCB) {
        let query = " ";
        let q = 'MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m)';
        session.run(q).then(function(res) {
            items = res.records.length;
        }).catch(function(err) {
            console.log("Error in getting all questions" + err);
        })
        if (data.skip == 0 || data.skip == 1) {
            skip = 0

        } else {
            skip = 4 * (parseInt(data.skip) - 1);
        }
        /* building a cypher query */
        query = `MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m) order by n.name skip ${skip} limit 4;`;
        /* executing the cypher query */
        session.run(query).then(function(result) {
            successCB(result, items);
        }).catch(function(err) {
            errorCB(err);
        });
    },
    /*to add answer to the existing question */
    answer: function(data, successCB, errorCB) {
        var label;
        let query = " ";
        /* building a cypher query */
        query = `merge (n:${data.label}{name:"${data.name}"}) with n\
             match (m:question{name:"${data.question}"})\
             merge (m)<-[r:answer_to]-(n) return n,m`;

        /* executing the cypher query */
        session.run(query).then(function(result) {
            successCB(result);
        }).catch(function(err) {
            errorCB(err);

        });
    },
    /*to add new question to the neo4j db*/
    newQuestions: function(data, successCB, errorCB) {
        let query = " ";
        console.log(data);
        if(data.alert == "one") {
          query = `match (n:domain{name:"react"})\
                  merge (m:concept{name:"${data.concept}"})-[r:concept_of]->(n) with n,m\
                  merge (o:question{name:"${data.question}"})-[q:${data.relation}]->(m) with m,o\
                  merge (p:${data.type}{name:"${data.answer}"})-[t:answer_to]->(o)  return p,o,m;`;
        } else {
          query = `match (n:domain{name:"react"})\
                  merge (m:concept{name:"${data.concept}"})-[r:concept_of]->(n) with n,m\
                  merge (w:concept{name:"${data.concepttwo}"})-[r1:concept_of]->(n) with n,m,w\
                  merge (o:question{name:"${data.question}"})-[q:${data.relation}]->(m) with m,o,w\
                  merge (o)-[q1:${data.relation}]->(w) with m,o,w,q1\
                  merge (p:${data.type}{name:"${data.answer}"})-[t:answer_to]->(o)  return p,o,m;`;
        }
        /* executing the cypher query */
        session.run(query).then(function(result) {
            successCB(result);
        }).catch(function(err) {
            errorCB(err);

        });
    },
    /*will add the unanswered question to mongodb*/
    notify_UnAnswered: function(data, successCB, errorCB) {
        let unanswered = new unansweredquestions();
        console.log(data.username);
        unanswered.question = data.question;
        unanswered.username = data.username;
        unansweredquestions.findOne({
            'question': data.question,
        }, function(err, question) {
            if (err) {
                console.log(err);
                errorCB(err);
            }
            if (question) {
                successCB("question already notified");
            } else {
                unanswered.save(function(err) {
                    if (err) {
                        console.log(err);
                        errorCB(err);
                    }
                    successCB(unanswered);
                });
            }
        })

    },
    /* will add answer for unanswered question*/
    answer_unAnswered: function(data, successCB, errorCB) {
        if (data.skip == 0 || data.skip == 1) {
            skipForUnanswered = 0

        } else {
            skipForUnanswered = 4 * (parseInt(data.skip) - 1);
        }
        unansweredquestions.find(function(err, questions) {
            if (questions) {
                successCB(questions);
            } else {
                errorCB(err);
            }
        }).skip(skipForUnanswered).limit(4);

    },
    /*to delete the question from unanswered list once it is answered*/
    unAnswered_delete: function(data, successCB, errorCb) {
        unansweredquestions.remove({
            'question': data.question
        }, function(err, result) {
            if (err) {
                errorCB(err);
            } else {
                successCB("successfully deleted");
            }
        })
    }
}
module.exports = controls;

let stopWord = require('stopword');
let UserModel = require('./user.model.js');
let ChatHistory = require('./userChatHistory.model.js');
let Bookmarks = require('./userBookmark.model.js');
let driver = require('../config/neo4j.js');
let skipLimit = 0;

let adminSignup = function(admin, successCB, errorCB) {
    let newAdmin = new UserModel();
    newAdmin.username = admin.username;
    newAdmin.password = admin.password;
    newAdmin.email = admin.email;
    newAdmin.type = 'admin';
    newAdmin.save(function(err) {
        if (err) {
            errorCB(err);
        }
        successCB(newAdmin);
    });
}

let chathistory = function(history, successCB, errorCB) {
    ChatHistory.findOneAndUpdate({
        username: history.username
    }, {
        $pushAll: {
            messages: history.messages
        }
    }, {
        upsert: true
    }, function(err) {
        if (err) {
            console.log('err for saving chathistory: ', err)
            errorCB(err);
        }
        successCB("successfully saved");
    });
}

let getchathistory = function(username, skip, successCB, errorCB) {
    skipLimit = (-10 * parseInt(skip));
    ChatHistory.findOne({
        username: username
    }, {
        "messages": {
            $slice: skipLimit
        }
    }, function(err, data) {
        if (err) {
            console.log('err in chathistory:', err)
            errorCB(err);
        }
        successCB(data);
    });
}

let addingbookmarks = function(bookmarks, data, successCB, errorCB) {
    ChatHistory.update({
        'username': bookmarks.username,
        'messages.value': data.bookmarks[0].value
    }, {
        '$set': {
            'messages.$.bookmark': true
        }
    }, function(err) {
        if (err) {
            console.log('err for saving bookmarkflag: ', err)
            errorCB(err);
        }
        //successCB("successfully saved");
    })

    Bookmarks.findOneAndUpdate({
        username: bookmarks.username
    }, {
        $pushAll: {
            bookmarks: bookmarks.bookmarks
        }
    }, {
        upsert: true
    }, function(err) {
        if (err) {
            console.log('err for saving bookmarks: ', err)
            errorCB(err);
        }
        successCB("successfully saved");
    })
}

let getBookmarks = function(username, successCB, errorCB) {
    Bookmarks.findOne({
        username: username
    }, function(err, data) {
        if (err) {
            console.log('err for getting bookmarks: ', err)
            errorCB(err);
        }
        successCB(data);
    })
}

let deleteBookmark = function(username, answer, successCB, errorCB) {
    ChatHistory.update({
        'username': username,
        'messages.value': answer
    }, {
        '$set': {
            'messages.$.bookmark': false
        }
    }, function(err) {
        if (err) {
            console.log('err for delete bookmarkflag: ', err)
            errorCB(err);
        }
        //successCB("successfully saved");
    })
    Bookmarks.update({
        username: username
    }, {
        $pull: {
            bookmarks: {
                value: answer
            }
        }
    }, function(err) {
        if (err) {
            console.log('err for deleting bookmarks: ', err)
            errorCB(err);
        }
        successCB("successfully deleted");
    });
}
let answer = function(words, successCB, errorCB) {
    let queryToFindRelation = " ";
    let queryToGetIntents = " ";
    let queryToFindAnswer = " ";
    let intentArray = [];
    let intent = " ";
    let relation = " ";
    let resultobj = [];
    let answer_label = " ";
    var punctuationless = words.words.replace(/[^\w\s]|_/g, "");
    var finalString = punctuationless.replace(/\s+/g, " ");
    let question = finalString.split(' ');
    /* connecting to the db */
    let session = driver.session();
    /* building a cypher query */
    queryToGetIntents = ` match (n:intent) return {intents : collect(n.name)};`;
    /* executing the cypher query */
    session.run(queryToGetIntents).then(function(result) {
        for (var i = 0; i < result.records[0]._fields[0].intents.length; i++) {
            intentArray.push(result.records[0]._fields[0].intents[i]);
        }
        for (var i = 0; i < question.length; i++) {
            if (intentArray.includes(question[i].toLowerCase())) {
                intent = question[i];
                question.splice(i, 1); /*to remove the intent word from keyword*/
                break;
            }
        }
        /*to find the answer label*/
        for (var i = 0; i < question.length; i++) {
            if (question[i].toLowerCase() == "video") {

                answer_label = ":video";
                question.splice(i, 1);
                break;
            } else if (question[i].toLowerCase() == "text") {

                answer_label = ":text";
                question.splice(i, 1);
                break;
            } else if (question[i].toLowerCase() == "blog") {

                answer_label = ":blog";
                break;
            } else {

                answer_label = "";
                break;
            }
        }
        let keyword = stopWord.removeStopwords(question);
        /* building a cypher query */
        queryToFindRelation = `MATCH (intent:intent {name: "${intent}"}) WITH intent AS c\
               MATCH (c) -[:same_as]->(q) with q.name as d return d`;
        /* executing the cypher query */
        session.run(queryToFindRelation).then(function(result) {
            if (result.records.length == 0) {
                relation = "definition_question_for";
                //successCB("no intent found")
            } else {
                relation = result.records[0]._fields[0];
            } /*end of else queryToFindRelation*/
            let params = {
                    "keywords": keyword,
                    "intent": relation,
                    "answer_label": answer_label
                }
                /* building a cypher query */
            queryToFindAnswer = `match (n:domain{name:"react"})\
                          match (m:concept)-[:concept_of]->(n) where m.name in {keywords}\
                           match (o:question)-[rel:${params.intent}]->(m)\
                          match (q${params.answer_label})-[:answer_to]->(o) return collect(distinct q) ,o,count(rel) order by count(rel) desc;`;
            /* executing the cypher query */
            session.run(queryToFindAnswer, params).then(function(result) {
                if (result.records.length == 0) {
                    successCB("no answer found")
                } else {
                    result.records[0]._fields[0].map((data2, index2) => {
                        let label = result.records[0]._fields[0][index2].labels[0];
                        resultobj.push({
                            label: result.records[0]._fields[0][index2].labels[0],
                            value: result.records[0]._fields[0][index2].properties.name
                        })

                    })
                    successCB(resultobj);
                } /*else for queryToFindAnswer*/
            }).catch(function(err) {
                console.log(err);
                errorCB(err);
            }); /*end of third query*/

        }).catch(function(err) {
            console.log(err);
        }); /*end of second query*/
    }).catch(function(err) {
        console.log(err);
    }); /*end of first query*/
}

let clear = function(username, successCB, errorCB) {
    ChatHistory.remove({
        'username': username.username
    }, function(err, result) {
        if (err) {
            errorCB(err);
        } else {
            successCB("successfully deleted");
        }
    })
}
module.exports = {
    adminSignup,
    answer,
    chathistory,
    getchathistory,
    addingbookmarks,
    getBookmarks,
    clear,
    deleteBookmark
}

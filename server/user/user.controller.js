let stopWord = require('stopword');
let UserModel = require('./user.model.js');
let ChatHistory = require('./userChatHistory.model.js');
let Bookmarks = require('./userBookmark.model.js');
let driver = require('../config/neo4j.js');


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
ChatHistory.findOneAndUpdate({username:history.username},{$pushAll: {messages: history.messages}}, {upsert: true},function(err) {
    if (err) {
        console.log('err for saving chathistory: ', err)
        errorCB(err);
    }
    successCB("successfully saved");
});
}

let getchathistory = function(username, successCB, errorCB) {
  ChatHistory.findOne({username:username},function(err, data) {
    if(err) {
      console.log('err in chathistory:', err)
      errorCB(err);
    }
    successCB(data);
  });
}

let addingbookmarks = function(messages, successCB, errorCB){
  Bookmarks.findOneAndUpdate({username:bookmarks.username},{$pushAll: {bookmarks:messages.bookmarks}}, {upsert:true}, function(err){
    if (err) {
        console.log('err for saving bookmarks messages: ', err)
        errorCB(err);
    }
    successCB("successfully saved");
  })
}
let answer = function(words, successCB, errorCB) {
    let queryToFindRelation = " ";
    let queryToGetIntents = " ";
    let queryToFindAnswer = " ";
    let intentArray = [];
    let intent = " ";
    let relation = " ";
    let resultobj = [];
    let question = words.words.split(' ');
    /* connecting to the db */
    let session = driver.session();
    /* building a cypher query */
    queryToGetIntents = ` match (n:intent) return {intents : collect(n.name)};`;
    /* executing the cypher query */
    session.run(queryToGetIntents).then(function(result) {
        for(var i=0;i<result.records[0]._fields[0].intents.length;i++) {
          intentArray.push(result.records[0]._fields[0].intents[i]);
        }
        for(var i=0;i<question.length;i++) {
          if(intentArray.includes(question[i].toLowerCase())) {
            intent = question[i];
            question.splice(i,1);/*to remove the intent word from keyword*/
            break;
          }
        }
        let keyword = stopWord.removeStopwords(question);
        //console.log("inent",intent)
        /* building a cypher query */
        queryToFindRelation = `MATCH (intent:intent {name: "${intent}"}) WITH intent AS c\
               MATCH (c) -[:same_as]->(q) with q.name as d return d`;
               /* executing the cypher query */
               session.run(queryToFindRelation).then(function(result) {
                 if(result.records.length == 0) {
                   relation = "definition_question_for";
                   //successCB("no intent found")
                 } else {
                 relation = result.records[0]._fields[0];
                   }/*end of else queryToFindRelation*/
                 let params = {
                               "keywords" : keyword,
                               "intent" : relation
                             }
                             //console.log("keyword", params.keywords);
                 /* building a cypher query */
                 queryToFindAnswer = `match (n:domain{name:"react"})\
                          match (m:concept)-[:concept_of]->(n) where m.name in {keywords}\
                           match (o:question)-[rel:${params.intent}]->(m)\
                          match (q)-[:answer_to]->(o) return collect(distinct q) ,o,count(rel) order by count(rel) desc;`;
                 /* executing the cypher query */
                 session.run(queryToFindAnswer,params).then(function(result) {
                   if(result.records.length == 0) {
                     successCB("no answer found")
                   } else {
                    // console.log("map",result.records[index]);
                     result.records[0]._fields[0].map((data2,index2)=> {
                       //console.log("label",result.records[index]._fields[0][index2].labels[0],"ans",result.records[index]._fields[0][index2].properties.name);
                       let label = result.records[0]._fields[0][index2].labels[0];
                         resultobj.push(
                           {label :  result.records[0]._fields[0][index2].labels[0],
                            value :  result.records[0]._fields[0][index2].properties.name }
                         )

                     })
                   successCB(resultobj);
                 }/*else for queryToFindAnswer*/
              }).catch(function(err) {
                console.log(err);
                errorCB(err);
              });/*end of third query*/

         }).catch(function(err) {
           console.log(err);
         });/*end of second query*/
       }).catch(function(err) {
      console.log(err);
    });/*end of first query*/
}
module.exports = {
    adminSignup,
    answer,
    chathistory,
    getchathistory,
}

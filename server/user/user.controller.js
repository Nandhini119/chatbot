let stopWord = require('stopword');
let UserModel = require('./user.model.js');
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

let answer = function(words, successCB, errorCB) {
    let query = " ";
    let query2 = " ";
    let query3 = " ";
    let intentArray = [];
    let intent = " ";
    let relation = " ";
    let question = words.words.split(' ');
    /* connecting to the db */
    let session = driver.session();
    let session2 = driver.session();
    let session3 = driver.session();
    /* building a cypher query */
    query2 = ` match (n:intent) return {intents : collect(n.name)};`;
    /* executing the cypher query */
    session.run(query2).then(function(result) {
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
        /**closing session for first query*/
        session.close();
        let keyword = stopWord.removeStopwords(question);
        /* building a cypher query */
        query = `MATCH (intent:intent {name: "${intent}"}) WITH intent AS c\
               MATCH (c) -[:same_as]->(q) with q.name as d return d`;
               /* executing the cypher query */
               session2.run(query).then(function(result) {
                 relation = result.records[0]._fields[0];
                 let params = {
                               "keywords" : keyword,
                               "intent" : relation
                             }
                             console.log("keyword", params.keywords);
                 /*closing session for second query*/
                 session2.close();
                 /* building a cypher query */
                 query3 = `match (n:domain{name:"react"})\
                          match (m:concept)-[:concept_of]->(n) where m.name in {keywords}\
                          match (o:question)-[:${params.intent}]->(m)\
                          match (q)-[:answer_to]->(o) return collect(q),o;`;
                 /* executing the cypher query */
                 session3.run(query3,params).then(function(result) {
                   console.log(JSON.stringify(result.records[0]));
                   /*closing session for third query*/
                   session3.close();
              }).catch(function(err) {
                console.log(err);
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

}

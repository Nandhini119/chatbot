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
    let intent = " ";
    console.log("hi get answer");
    let question = words.words.split(' ');
    let intentOne = ["definition_question_for","what","define","definition"];
    let intentTwo = ["example_question_for","demo","example"];
    for(var i = 0;i<question.length;i++)
    {
      if(intentOne.includes(question[i].toLowerCase())) {
        intent = "definition_question_for";
        break;
      }
      else if(intentTwo.includes(question[i].toLowerCase())) {
        intent = "example_question_for";
        break;
      }
      else {
        intent = "definition_question_for";
        break;
      }
    }
    let keyword = stopWord.removeStopwords(question);
    let params = {
                        "keywords" : keyword,
                        "intent" : intent
                  }
    /* connecting to the db */
    let session = driver.session();
    /* building a cypher query */
    query = `match (n:domain{name:"react"})<-[:concept_of]-(m:concept)<-[:${params.intent}]-(p)<-[:answer_to]-(o) where m.name in ["${params.keywords}"] return collect(o);`;
    /* executing the cypher query */
    session.run(query).then(function(result) {
        /* making a connection close request */
        session.close();
        console.log(JSON.stringify(result));
        successCB(result);

    }).catch(function(err) {
      console.log(err);
        errorCB(err);
    });
}
module.exports = {
    adminSignup,
    answer,

}

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
    console.log("hi get answer");
    let question = words.words.split(' ');
    let keyword = stopWord.removeStopwords(question);
    let params = {
                        "keywords" : keyword,
                        "intent" : ['definition_question_for','definition','define','what','example','demo','example_question_for']
                      }
    /* connecting to the db */
    let session = driver.session();
    /* building a cypher query */
    query = ``;
    /* executing the cypher query */
    session.run(query,params).then(function(result) {
        /* making a connection close request */
        session.close();

        successCB(result);

    }).catch(function(err) {
        errorCB(err);
    });
}
module.exports = {
    adminSignup,
    answer,

}
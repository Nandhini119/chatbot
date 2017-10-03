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
    var wordarr = [];
    console.log(words);
    for (var key in words['words[]']) {
        wordarr.push(words['words[]'][key]);
    }
    console.log("wordarr", wordarr[0]);
    /* connecting to the db */
    let session = driver.session();
    /* building a cypher query */
    let query = `MATCH (N:intent) return N`;
    /* executing the cypher query */
    session.run(query).then(function(result) {
        console.log("query running");
        for (var key in JSON.stringify(result)) {
            //  console.log(result.records[key]._fields[0].properties.name);
        }

        /* making a connection close request */
        session.close();

        successCB("hi");

    }).catch(function(err) {
        errorCB(err);
    });
}
module.exports = {
    adminSignup,
    answer,

}
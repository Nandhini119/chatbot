let UserModel = require('../../models/user');

let adminSignup = function(admin, successCB, errorCB) {
    let newAdmin = new UserModel();
    newAdmin.username = admin.username;
    newAdmin.password = admin.password;
    newAdmin.email = admin.email;
    newAdmin.type = 'admin';
    newAdmin.save(function(err) {
      if(err) {
        errorCB(err);
      }
      successCB(newAdmin);
    });
}

let question = function(words,success,error){
  for(var key in words['words[]']) {
    var value = words['words[]'][key];
    console.log("value"+value);
}

}
module.exports = {
  adminSignup,
  question
}

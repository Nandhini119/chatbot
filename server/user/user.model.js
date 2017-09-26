var mongoose = require('mongoose');
 let Schema = new mongoose.Schema({
    username: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    type: String,
    status: String
});
let user = mongoose.model("user", Schema);
module.exports = user;

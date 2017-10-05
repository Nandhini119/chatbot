var mongoose = require('mongoose');
let Schema = new mongoose.Schema({
  username: String,
  messages :[{
    type: String,
    value: String,
    timestamp: Number
  }]
});
let chathistory = mongoose.modal("chathistory", Schema);
module.exports = chathistory;

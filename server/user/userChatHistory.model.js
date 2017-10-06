var mongoose = require('mongoose');
let Schema = new mongoose.Schema({
  username: String,
  messages : Array
});
let chathistory = mongoose.model("chathistory", Schema);
module.exports = chathistory;

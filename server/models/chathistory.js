let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  messages: [{
    type: String,
    value: String,
    timestamp: Number
  }]
});

 let chathistory = mongoose.model("chathistory", schema);
 module.exports = user;

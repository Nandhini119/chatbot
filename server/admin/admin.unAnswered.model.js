var mongoose = require('mongoose');
let Schema = new mongoose.Schema({
    question: String,
    username : String
});
let unansweredquestions = mongoose.model("unansweredquestions", Schema);
module.exports = unansweredquestions;

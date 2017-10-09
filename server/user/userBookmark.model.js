var mongoose = require('mongoose');
let Schema = new mongoose.Schema({
  username: String,
  bookmarks : Array
});
let bookmark = mongoose.model("bookmarks", Schema);
module.exports = bookmark;

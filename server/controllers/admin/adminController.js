let user = require('../../models/user');

let controls = {
  allUsers : function(req,res){
    user.find({type : "user"},function(err,data){
      if(err)
      throw err;
      else {
        res.status(200).json({
          result: data
        });
      }
    });
  }

}
module.exports = controls;

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
  },
  checkstatus : function(req,res) {
    user.find({email : req.query.email},function(err,data){
      if(err)
      throw err;
      else {
        console.log(data);
      res.send(data)
    }
  });
},
  blockUsers : function(req,res){
    user.update({'email' : req.body.email},{'status' : 'blocked'},function(err,data){
      if(err)
      throw err;
      else {
        res.status(200).json({status:'status changed'});
      }
    })
  },
  unblockUsers : function(req,res){
    user.update({'email' : req.body.email},{'status' : 'active'},function(err,data){
      if(err)
      throw err;
      else {
        res.status(200).json({status:'status changed'});
      }
    })
  },


}
module.exports = controls;

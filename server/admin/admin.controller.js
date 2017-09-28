let user = require('../user/user.model.js');
let driver = require('../config/neo4j.js');
/* connecting to the db */
let session = driver.session();
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
  questions : function(user, successCB, errorCB) {
    console.log("in get all questions");

     /* building a cypher query */
     let query = `MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m) limit 3;`;
     /* executing the cypher query */
     session.run(query).then(function(result) {
     console.log("query running");
     successCB(result);
     }).catch(function(err) {
       errorCB(err);
     });
},
answer : function(user, successCB, errorCB) {
  console.log("in  answer");
  console.log("user",user);
  var label;
  let query = " ";
  if(user.label == "blog"){
    /* building a cypher query */
    query = 'merge (n: blog {name:{name}}) with n\
                 match (m:question {name:{question}})\
                 merge (m)<-[r:answer_to]-(n) return n,m';
  } else if (user.label == "video") {
    /* building a cypher query */
    query = 'merge (n: video {name:{name}}) with n\
                 match (m:question {name:{question}})\
                 merge (m)<-[r:answer_to]-(n) return n,m';
  } else if (user.label == "text") {
    /* building a cypher query */
    query = 'merge (n: text {name:{name}}) with n\
                 match (m:question {name:{question}})\
                 merge (m)<-[r:answer_to]-(n) return n,m';
  } else {
    /* building a cypher query */
    query = 'merge (n: blog {name:{name}}) with n\
                 match (m:question {name:{question}})\
                 merge (m)<-[r:answer_to]-(n) return n,m';
  }

   /* executing the cypher query */
   session.run(query,user).then(function(result) {
   console.log("query running");
   console.log(result);


   successCB(result);
   }).catch(function(err) {
     errorCB(err);

   });
}


}
module.exports = controls;

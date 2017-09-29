let user = require('../user/user.model.js');
let driver = require('../config/neo4j.js');
/* connecting to the db */
let session = driver.session();
let items = 0;
let skip = 0;
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
  questions : function(data, successCB, errorCB) {
    let query = " ";
    let q = 'MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m)';
    session.run(q).then(function(res) {
      items = res.records.length;
    }).catch(function(err) {
      console.log("Error"+err);
    })
    if(data.skip == 0 || data.skip == 1) {
      skip = 0
      /* building a cypher query */
      query = `MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m) order by n.name skip ${skip} limit 2;`;
    }
    else {
      skip = 2 * (parseInt(data.skip)-1);
      console.log(skip);
      /* building a cypher query */
      query = `MATCH path=(n)<-[r:answer_to]-(m) return n,collect(m) order by n.name skip ${skip} limit 2;`;
    }

     /* executing the cypher query */
     session.run(query).then(function(result) {
     console.log("query running");
     successCB(result,items);
     }).catch(function(err) {
       errorCB(err);
     });
},
answer : function(data, successCB, errorCB) {
  console.log("in  answer");
  var label;
  let query = " ";
  if(data.label == "blog"){
    /* building a cypher query */
    query = 'merge (n: blog {name:{name}}) with n\
                 match (m:question {name:{question}})\
                 merge (m)<-[r:answer_to]-(n) return n,m';
  } else if (data.label == "video") {
    /* building a cypher query */
    query = 'merge (n: video {name:{name}}) with n\
                 match (m:question {name:{question}})\
                 merge (m)<-[r:answer_to]-(n) return n,m';
  } else if (data.label == "text") {
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
   session.run(query,data).then(function(result) {
   console.log("query running");


   successCB(result);
   }).catch(function(err) {
     errorCB(err);

   });
},
newQuestions : function(data,successCB,errorCB) {
  let query = " ";
  console.log("in adding new questions");
  console.log(data);
  if(data.relation == "definition") {
    if(data.type == "text") {
    query = 'match (n:domain{name:"react"})\
            merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
            merge (o:question{name:{question}})-[q:definition_question_for]->(m) with m,o\
            merge (p:text{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      } else if(data.type == "video") {
        query = 'match (n:domain{name:"react"})\
                merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
                merge (o:question{name:{question}})-[q:definition_question_for]->(m) with m,o\
                merge (p:video{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      }else if(data.type =="blog") {
        query = 'match (n:domain{name:"react"})\
                merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
                merge (o:question{name:{question}})-[q:definition_question_for]->(m) with m,o\
                merge (p:blog{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      } else {
        query = 'match (n:domain{name:"react"})\
                merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
                merge (o:question{name:{question}})-[q:definition_question_for]->(m) with m,o\
                merge (p:text{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      }

  } else if(data.relation == "example"){
    if(data.type == "text") {
    query = 'match (n:domain{name:"react"})\
            merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
            merge (o:question{name:{question}})-[q:example_question_for]->(m) with m,o\
            merge (p:text{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      } else if(data.type == "video") {
        query = 'match (n:domain{name:"react"})\
                merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
                merge (o:question{name:{question}})-[q:example_question_for]->(m) with m,o\
                merge (p:video{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      }else if(data.type =="blog") {
        query = 'match (n:domain{name:"react"})\
                merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
                merge (o:question{name:{question}})-[q:example_question_for]->(m) with m,o\
                merge (p:blog{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      } else {
        query = 'match (n:domain{name:"react"})\
                merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
                merge (o:question{name:{question}})-[q:example_question_for]->(m) with m,o\
                merge (p:text{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
      }
    } else {
      query = 'match (n:domain{name:"react"})\
              merge (m:concept{name:{concept}})-[r:concept_of]->(n) with n,m\
              merge (o:question{name:{question}})-[q:definition_question_for]->(m) with m,o\
              merge (p:text{name:{answer}})-[t:answer_to]->(o)  return p,o,m;'
    }
  /* executing the cypher query */
  session.run(query,data).then(function(result) {
  console.log("query running");


  successCB(result);
  }).catch(function(err) {
    console.log(err);
    errorCB(err);

  });
}


}
module.exports = controls;

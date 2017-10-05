var express = require('express');
var router = express.Router();
let usersController = require('./user.controller.js');

module.exports = function(passport) {
  router.post('/question',function(req,res){
    console.log("sfas",req.body);
    try {
      usersController.question(req.body, function(result) {
        res.status(201).json({
          result: result
        });
      }, function(error) {
        res.status(500).json({
          error: error
        });
      });
    } catch(e) {
      console.log('error in signup success route: ', e)
      res.status(500).json({
        error: "internal server error"
      });
    }

  });


  /* login action */
  router.post('/login', function(req, res, next) {
      passport.authenticate('login', function(err, user, info) {
        if(err) return res.status(500).json({message: 'Server Error'});
        else if(user) return res.status(200).json({user: user});
        else return res.status(500).json({message: 'Invalid User'});
      })(req, res, next);
    });

  /* user signup action */
  router.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, newUser, info){
      if(err) return res.status(500).json({status: 'signup failed'});
      else if(newUser) return res.status(200).json({status:'signup success'});
      else return res.status(500).json({status:'username already exsist'});
    })(req)
  });

  router.post('/adminsignup', function(req, res) {
    console.log('POST /users/adminsignup');
    try {
      usersController.adminSignup(req.body, function(result) {
        res.status(201).json({
          result: result
        });
      }, function(error) {
        res.status(500).json({
          error: error
        });
      });
    } catch(e) {
      console.log('error in signup success route: ', e)
      res.status(500).json({
        error: "internal server error"
      });
    }
  });

   router.get('/logout',function(request, response) {
     console.log("in logout");
     request.session.destroy(function(req,res,err) {
       if(err) {
        console.log("status of error in logout" + err);
         response.status(500).json({status: 'error in logout'});
       } else {
         console.log("success in logout");
         response.status(200).json({status:'success'});
       }
     });
   });


   return router;
}

var express = require('express');
var router = express.Router();

let usersController = require('../../controllers/user/usersController.js');

module.exports = function(passport){

  /* login action */
  router.post('/login', function(req, res, next) {
      passport.authenticate('login', function(err, user, info) {
        if(err) return res.status(500).json({message: 'Server Error'});
        else if(user) return res.status(200).json({user: user});
        else return res.status(500).json({message: 'Invalid User'});
      })(req, res, next)
    });

  /* user signup action */
  router.post('/signup', passport.authenticate('signup',{
     successRedirect:'/users/signupsuccess',
     failureRedirect:'/users/signupfailed',
  }));

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

  router.get('/signupsuccess', function(req, res) {
     try {
       res.status(200).json({status: 'signup success'});
     } catch(e) {
       console.log('error in signup success route: ', e)
     }
   });

   router.get('/signupfailed', function(req, res) {
     console.log('failed signupfailed');
     try {
       res.status(200).json({status: 'username already exsist'});
     } catch(e) {
       console.log('error in signup failed route: ', e)
     }
   });

   return router;
}

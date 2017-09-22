var express = require('express');
var router = express.Router();

let usersController = require('../../controllers/user/usersController.js');

module.exports = function(passport){

  // Login action
  router.post('/login',passport.authenticate('login',{
    successRedirect:'/users/loginsuccess',
    failureRedirect:'/users/loginfailed',
  }));

  router.get('/loginsuccess', function(req,res){
    try{
      res.status(200).json({status:'login success'});
    } catch(e) {
      console.log('error in loginsuccess route', e)
    }
  });

  router.get('/loginfailed', function(req,res) {
    try{
      res.status(200).json({status:'login failed'});
    } catch(e) {
      console.log('error in loginfailed route', e)
    }
  });
  /* signup action */
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

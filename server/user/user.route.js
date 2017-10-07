var express = require('express');
var router = express.Router();
let usersController = require('./user.controller.js');

module.exports = function(passport) {
    router.get('/answer', function(req, res) {
        try {
            console.log(req.query.words)
            usersController.answer(req.query, function(result) {
                res.status(201).json({
                    result: result
                });
            }, function(error) {
                res.status(500).json({
                    error: error
                });
            });
        } catch (e) {
            console.log('error in getting answer route: ', e)
            res.status(500).json({
                error: "internal server error"
            });
        }

    });

    /* chathistory router */
    router.post('/chathistory', function(req, res) {
      try {
        //console.log("inside chathistory route ", req.body);
        usersController.chathistory(req.body, function(result) {
          //console.log('success')
            res.status(201).json({
                result: result
            });
        }, function(error) {
          //console.log("err")
            res.status(500).json({
                error: error
            });
        });

      } catch (e) {
          console.log('error in chathistory route: ', e)
          res.status(500).json({
              error: "internal server error"
          });
      }
    });

    router.get('/getchathistory', function(req,res){
      try {
        var username = req.query.username;
        //console.log("username", req.query.username);
        usersController.getchathistory(username,function(result){
          //console.log('inside getchathistory route')
            res.status(201).json({
                result: result

        })
      //  console.log('result:', result);
      },function(error) {
        //console.log("err")
          res.status(500).json({
              error: error
          });
      });

    } catch (e) {
        console.log('error in getchathistory route: ', e)
        res.status(500).json({
            error: "internal server error"
        });
    }
  });

    /* login action */
    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {
            if (err) return res.status(500).json({
                message: 'Server Error'
            });
            else if (user) {
                return res.status(200).json({
                    user: user
                });
            } else return res.status(500).json({
                message: 'Invalid User'
            });
        })(req, res, next);
    });

    /* user signup action */
    router.post('/signup', function(req, res, next) {
        passport.authenticate('signup', function(err, newUser, info) {
          console.log("inside signup route");
            if (err) return res.status(500).json({
                status: 'signup failed'
            });
            else if (newUser) return res.status(200).json({
                status: 'signup success'
            });
            else return res.status(500).json({
                status: 'username already exsist'
            });
        })(req, res, next);
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
        } catch (e) {
            console.log('error in signup success route: ', e)
            res.status(500).json({
                error: "internal server error"
            });
        }
    });

    router.get('/logout', function(request, response) {
        console.log("in logout");
        request.session.destroy(function(req, res, err) {
            if (err) {
                console.log("status of error in logout" + err);
                response.status(500).json({
                    status: 'error in logout'
                });
            } else {
                console.log("success in logout");
                response.status(200).json({
                    status: 'success'
                });
            }
        });
    });

    return router;
}

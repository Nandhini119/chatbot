var express = require('express');
var router = express.Router();
let usersController = require('./user.controller.js');


module.exports = function(passport) {
  /*will get answer for the users question from neo4j db*/
    router.get('/answer', function(req, res) {
        try {
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

    /* chathistory router to save in db */
    router.post('/chathistory', function(req, res) {
        try {
            usersController.chathistory(req.body, function(result) {
                res.status(201).json({
                    result: result
                });
            }, function(error) {
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

    /* Retrieving chathistory from DB */
    router.get('/chathistory', function(req, res) {
        try {
            var username = req.query.username;
            var skip = req.query.skip;
            usersController.getchathistory(username, skip, function(result) {
                res.status(201).json({
                        result: result
                    })
            }, function(error) {
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

    /* adding bookmarks to mongodb */
    router.post('/addbookmarks', function(req, res) {
        try {
            usersController.addingbookmarks(req.body.bookmark,req.body.data, function(result) {
                res.status(201).json({
                    result: result
                });
            }, function(error) {
                res.status(500).json({
                    error: error
                });
            });

        } catch (e) {
            console.log('error in addingbookmarks route: ', e)
            res.status(500).json({
                error: "internal server error"
            });
        }
    })
    /*will get the bookmark list from mongodb*/
    router.get('/bookmarks', function(req, res) {
        try {
            var username = req.query.username;
            usersController.getBookmarks(username, function(result) {
                res.status(201).json({
                    result: result
                });
            }, function(error) {
                res.status(500).json({
                    error: error
                });
            });

        } catch (e) {
            console.log('error in getbookmarks route: ', e)
            res.status(500).json({
                error: "internal server error"
            });
        }
    })
    /*to delete the bookmark of particular question saved in mongodb*/
    router.post('/deletebookmarks', function(req, res, next) {
        try {
            var username = req.body.username;
            var value = req.body.value;
            usersController.deleteBookmark(username, value, function(result) {
                res.status(201).json({
                    result: result
                });
            }, function(error) {
                res.status(500).json({
                    error: error
                });
            });
        } catch (e) {
            console.log('error in deletebookmar route: ', e)
            res.status(500).json({
                error: "internal server error"
            });
        }
    })

    /* login action using passport*/
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

    /* user signup action to save user data in mongodb using passport*/
    router.post('/signup', function(req, res, next) {
        passport.authenticate('signup', function(err, newUser, info) {
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
    /*will clear the chathistory*/
    router.post('/clear', function(req, res) {
        try {
            usersController.clear(req.body, function(result) {
                res.status(201).json({
                    result: result
                });
            }, function(error) {
                res.status(500).json({
                    error: error
                });
            });
        } catch (e) {
            console.log('error in deleting chathistory route', e);
            res.status(500).json({
                error: "internal server error"
            });
        }
    });

    router.get('/logout', function(request, response) {
        request.session.destroy(function(req, res, err) {
            if (err) {
                console.log("status of error in logout" + err);
                response.status(500).json({
                    status: 'error in logout'
                });
            } else {
                response.status(200).json({
                    status: 'success'
                });
            }
        });
    });

    return router;
}

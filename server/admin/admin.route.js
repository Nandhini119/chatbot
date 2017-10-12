var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let adminControl = require('./admin.controller.js');

var isAuthenticated = function(req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) return next();
    // if the user is not authenticated then send an error message
    res.status(500).json({
        status: 'Invalid user'
    });
};
/*to get all the users of the application from mongodb*/
router.get('/users', adminControl.allUsers);
/*will check the status of the user whether in blocked or in active state*/
router.get('/status', adminControl.checkstatus);
/*will block the user*/
router.post('/block', adminControl.blockUsers);
/*will unblock the user*/
router.post('/unblock', adminControl.unblockUsers);
/*will get all the question from neo4j db*/
router.get('/questions', function(req, res) {
    try {
        adminControl.getquestions(req.query, function(result, items) {
            res.status(201).json({
                result: result,
                items: items
            });
        }, function(error) {
            res.status(500).json({
                error: error
            });
        });
    } catch (e) {
        console.log('error in getting questions route: ', e)
        res.status(500).json({
            error: "internal server error"
        });
    }
});
/*will add new answere for existing question to neo db*/
router.post('/answer', function(req, res) {
    try {
        adminControl.answer(req.body, function(result) {
            res.status(201).json({
                result: result
            });
        }, function(error) {
            res.status(500).json({
                error: error
            });
        });
    } catch (e) {
        console.log('error in adding answer route: ', e)
        res.status(500).json({
            error: "internal server error"
        });
    }
});
/* will add unanswered questions to neo db with answers*/
router.post('/questions', function(req, res) {
    try {
        adminControl.newQuestions(req.body, function(result) {
            res.status(201).json({
                result: result
            });
        }, function(error) {
            res.status(500).json({
                error: error
            });
        });
    } catch (e) {
        console.log('error in adding answer route: ', e)
        res.status(500).json({
            error: "internal server error"
        });
    }
});
/*to save the question which has no answeres in to mongodb*/
router.post('/unAnswered', function(req, res) {
    try {
        adminControl.notify_UnAnswered(req.body, function(result) {
            res.status(201).json({
                result: result
            });
        }, function(error) {
            res.status(500).json({
                error: error
            });
        });
    } catch (e) {
        console.log('error in adding unanswered route', e)
        res.status(500).json({
            error: "internal server error"
        });
    }
});
/* will get all the unanswered question from mongodb*/
router.get('/unAnswered', function(req, res) {
    try {
        adminControl.answer_unAnswered(req.query, function(result) {
            res.status(201).json({
                result: result
            });
        }, function(error) {
            res.status(500).json({
                error: error
            });
        });
    } catch (e) {
        console.log('érror in answering unanswered question', e);
        res.statue(500).json({
            error: "ïnternal server error"
        });
    }
});
/* will delete a particular unanswered questions stored in db*/
router.post('/question/:question', function(req, res) {
    try {
        adminControl.unAnswered_delete(req.params, function(result) {
            res.status(201).json({
                result: result
            });
        }, function(error) {
            res.status(500).json({
                error: error
            });
        });
    } catch (e) {
        console.log("error in deleting unanswered question route", e);
        res.status(500).json({
            error: "internal server error"
        });
    }
});

module.exports = router;

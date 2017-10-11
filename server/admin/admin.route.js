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

router.get('/users', adminControl.allUsers);
router.get('/status', adminControl.checkstatus);
router.post('/block', adminControl.blockUsers);
router.post('/unblock', adminControl.unblockUsers);
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
router.post('/question/:question', function(req, res) {
    try {
        console.log("in deleting unanswered question");
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